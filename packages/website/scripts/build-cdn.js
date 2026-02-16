/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import semver from 'semver';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // packages/website
const OUT_DIR = path.resolve(ROOT, '../../build');
const CDN_BASE = 'https://static.app.ge.ch/';
const SITE_ENTRY = './static/index.html';
const monorepoRoot = path.resolve(ROOT, '../..');
const WEB_COMPONENTS_SRC = path.resolve(monorepoRoot, 'packages/webcomponents');

const COMPONENT_NAMES = [
    'ge-autres-demarches',
    'ge-consent',
    'ge-footer',
    'ge-footer-armoiries',
    'ge-header',
    'ge-header-armoiries',
    'ge-header-public',
];

// ------------------------------------------------------------------
// Proxy-aware fetch
// ------------------------------------------------------------------
const HTTPS_PROXY =
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    (process.env.PROXY_HOST && process.env.PROXY_PORT
        ? `http://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`
        : null);

const proxyAwareFetch = (() => {
    if (HTTPS_PROXY) {
        console.log(`🌐 Using proxy for CDN requests: ${HTTPS_PROXY}`);
        const agent = new HttpsProxyAgent(HTTPS_PROXY);
        return (url, options = {}) => fetch(url, { ...options, agent });
    }
    console.log('🌐 No proxy configured, using direct connection');
    return fetch;
})();

// ------------------------------------------------------------------
// 1. Read per-component versions from their own package.json
// ------------------------------------------------------------------
/** @type {Record<string, string>} name → normalised semver */
const componentVersions = {};
for (const name of COMPONENT_NAMES) {
    const pkgPath = path.join(WEB_COMPONENTS_SRC, name, 'package.json');
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
    componentVersions[name] = pkg.version.replace(/-SNAPSHOT\.\d+$/, '');
}

console.log('🎯 Component versions:');
for (const [name, ver] of Object.entries(componentVersions)) {
    console.log(`   ${name} → ${ver}`);
}

// ------------------------------------------------------------------
// 2. Ensure OUT_DIR exists
// ------------------------------------------------------------------
await fs.mkdir(OUT_DIR, { recursive: true });

// ------------------------------------------------------------------
// 3. Fetch existing versions.json from CDN (per-component format)
//    Supports both legacy flat array and new per-component object.
// ------------------------------------------------------------------
const versionsJsonUrl = `${CDN_BASE}webcomponents/versions.json`;

/** @type {Record<string, string[]>} name → existing published versions */
const existingVersionsMap = {};
for (const name of COMPONENT_NAMES) existingVersionsMap[name] = [];

try {
    const res = await proxyAwareFetch(versionsJsonUrl);
    if (res.ok) {
        const payload = await res.json();

        if (Array.isArray(payload)) {
            // Legacy flat array → treat every version as present for all components
            console.log(`📥 Legacy versions.json detected: ${payload.join(', ')}`);
            for (const name of COMPONENT_NAMES) existingVersionsMap[name] = [...payload];
        } else {
            // Per-component object
            for (const name of COMPONENT_NAMES) {
                existingVersionsMap[name] = Array.isArray(payload[name]) ? payload[name] : [];
            }
            console.log('📥 Fetched per-component versions.json');
        }
    } else {
        console.log('ℹ️  No existing versions.json found on CDN — starting fresh');
    }
} catch (e) {
    console.warn('⚠️  Could not fetch versions.json:', e.message);
}

// ------------------------------------------------------------------
// 4. Download existing component files for previous versions
// ------------------------------------------------------------------
for (const name of COMPONENT_NAMES) {
    const currentVersion = componentVersions[name];

    for (const version of existingVersionsMap[name]) {
        if (version === currentVersion) continue; // will rebuild

        const remoteJsUrl = `${CDN_BASE}/webcomponents/${name}/${version}/${name}.js`;
        const remoteDtsUrl = `${CDN_BASE}/webcomponents/${name}/${version}/types/${name}.d.ts`;
        const localVersionDir = path.join(OUT_DIR, 'webcomponents', name, version);

        // Only create the directory if the JS file actually exists on CDN
        let jsFound = false;
        try {
            const jsRes = await proxyAwareFetch(remoteJsUrl);
            if (jsRes.ok) {
                await fs.mkdir(localVersionDir, { recursive: true });
                await fs.writeFile(path.join(localVersionDir, `${name}.js`), await jsRes.text());
                console.log(`  → ${name}@${version}.js`);
                jsFound = true;
            }
        } catch { /* skip */ }

        if (!jsFound) continue; // don't create empty version dirs

        try {
            const dtsRes = await proxyAwareFetch(remoteDtsUrl);
            if (dtsRes.ok) {
                const typesDir = path.join(localVersionDir, 'types');
                await fs.mkdir(typesDir, { recursive: true });
                await fs.writeFile(path.join(typesDir, `${name}.d.ts`), await dtsRes.text());
                console.log(`  → ${name}@${version}/types/${name}.d.ts`);
            }
        } catch { /* optional */ }
    }
}

// ------------------------------------------------------------------
// 5. Build current versions from local source
// ------------------------------------------------------------------
console.log('\n📦 Building current component versions…');

// Copy static + icons
execSync('yarn copy:static && yarn copy:icons', { stdio: 'inherit', cwd: ROOT });

// Build all webcomponents via turbo
execSync('turbo run build --filter="./packages/webcomponents/*"', {
    cwd: monorepoRoot,
    stdio: 'inherit',
});

// Copy each component's dist into its versioned directory
const importMap = { imports: {} };

for (const name of COMPONENT_NAMES) {
    const pkgRoot = path.join(WEB_COMPONENTS_SRC, name);
    const pkgJson = JSON.parse(await fs.readFile(path.join(pkgRoot, 'package.json'), 'utf8'));
    const entry = pkgJson.module || 'dist/index.js';
    const entryFile = path.basename(entry);
    const version = componentVersions[name];

    const srcDist = path.join(pkgRoot, 'dist');
    const destVer = path.join(OUT_DIR, 'webcomponents', name, version);

    await fs.rm(destVer, { recursive: true, force: true });
    await fs.cp(srcDist, destVer, { recursive: true });

    importMap.imports[`@ael/${name}`] = `${CDN_BASE}/webcomponents/${name}/${version}/${entryFile}`;

    console.log(`  ✔ ${name}@${version}`);
}

// ------------------------------------------------------------------
// 6. Write per-component versions.json
// ------------------------------------------------------------------
/** @type {Record<string, string[]>} */
const allVersionsMap = {};

for (const name of COMPONENT_NAMES) {
    const componentDir = path.join(OUT_DIR, 'webcomponents', name);
    const onDisk = [];
    try {
        for (const entry of await fs.readdir(componentDir)) {
            if (!semver.valid(entry)) continue;
            const stat = await fs.stat(path.join(componentDir, entry));
            if (stat.isDirectory()) onDisk.push(entry);
        }
    } catch { /* dir may not exist yet */ }
    allVersionsMap[name] = onDisk.sort(semver.compare);
}

const versionsPath = path.join(OUT_DIR, 'webcomponents', 'versions.json');
await fs.mkdir(path.dirname(versionsPath), { recursive: true });
await fs.writeFile(versionsPath, JSON.stringify(allVersionsMap, null, 2), 'utf8');

console.log('\n✅ versions.json (per-component):');
for (const [name, versions] of Object.entries(allVersionsMap)) {
    console.log(`   ${name}: ${versions.join(', ')}`);
}

// ------------------------------------------------------------------
// 7. Create symlinks (latest, X.latest, X.Y.latest) per component
// ------------------------------------------------------------------
console.log('\n🔗 Creating semver symlinks…');

for (const name of COMPONENT_NAMES) {
    const componentDir = path.join(OUT_DIR, 'webcomponents', name);
    try {
        const entries = await fs.readdir(componentDir);
        const versions = [];
        for (const v of entries) {
            if (!semver.valid(v)) continue;
            const stat = await fs.stat(path.join(componentDir, v));
            if (stat.isDirectory()) versions.push(v);
        }
        if (versions.length === 0) continue;
        versions.sort(semver.compare);

        const absoluteLatest = versions.at(-1);

        // latest
        const latestLink = path.join(componentDir, 'latest');
        await fs.rm(latestLink, { force: true });
        await fs.symlink(absoluteLatest, latestLink, 'junction');

        // Group by major.minor and major
        const byMajorMinor = {};
        const byMajor = {};
        for (const v of versions) {
            const major = semver.major(v);
            const minor = semver.minor(v);
            const mm = `${major}.${minor}`;
            if (!byMajorMinor[mm] || semver.gt(v, byMajorMinor[mm])) byMajorMinor[mm] = v;
            if (!byMajor[major] || semver.gt(v, byMajor[major])) byMajor[major] = v;
        }

        for (const [mm, v] of Object.entries(byMajorMinor)) {
            const link = path.join(componentDir, `${mm}.latest`);
            await fs.rm(link, { force: true });
            await fs.symlink(v, link, 'junction');
        }
        for (const [m, v] of Object.entries(byMajor)) {
            const link = path.join(componentDir, `${m}.latest`);
            await fs.rm(link, { force: true });
            await fs.symlink(v, link, 'junction');
        }

        console.log(` ${name}/latest → ${absoluteLatest}`);
    } catch (e) {
        console.error(`  ✗ Symlinks failed for ${name}:`, e.message);
    }
}

// ------------------------------------------------------------------
// 8. Build site
// ------------------------------------------------------------------
execSync(
    `parcel build ${SITE_ENTRY} --dist-dir ${OUT_DIR} --public-url / --no-content-hash`,
    { stdio: 'inherit', cwd: ROOT },
);

// ------------------------------------------------------------------
// 9. Write import-map.json
// ------------------------------------------------------------------
await fs.writeFile(path.join(OUT_DIR, 'import-map.json'), JSON.stringify(importMap, null, 2));

// ------------------------------------------------------------------
// 10. Inject build-version meta tag
// ------------------------------------------------------------------
const buildVersion = process.env.BUILD_VERSION || 'multi';
let html = await fs.readFile(path.join(OUT_DIR, 'index.html'), 'utf8');
if (!html.includes('name="build-version"')) {
    html = html.replace(/<head[^>]*>/i, `$&\n  <meta name="build-version" content="${buildVersion}">`);
    await fs.writeFile(path.join(OUT_DIR, 'index.html'), html);
}

console.log('\n🎉 CDN build complete (independent versions).\n');