/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import semver from 'semver';
import {HttpsProxyAgent} from "https-proxy-agent";
import fetch from "node-fetch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // packages/website
const OUT_DIR = path.resolve(ROOT, '../../build');
const CDN_BASE = 'https://static.dev.etat-ge.ch/';
const SITE_ENTRY = './static/index.html';
const monorepoRoot = path.resolve(ROOT, '../..');
const WEB_COMPONENTS_SRC = path.resolve(monorepoRoot, 'packages/webcomponents');

// Known component names (you can also read from node_modules/@ael)
const COMPONENT_NAMES = [
    'ge-autres-demarches',
    'ge-footer',
    'ge-footer-armoiries',
    'ge-header',
    'ge-header-armoiries',
    'ge-header-public',
    'ge-menu',
    'select-mes-espaces'
];

const rootPkg = JSON.parse(await fs.readFile(path.join(monorepoRoot, 'package.json'), 'utf8'));
const currentVersion = rootPkg.version.replace(/-SNAPSHOT\.\d+$/, ''); // normalize

console.log(`🎯 Current version: ${currentVersion}`);

// ------------------------------------------------------------------
// 1. Ensure OUT_DIR exists
await fs.mkdir(OUT_DIR, { recursive: true });

// ------------------------------------------------------------------
// 2. Fetch existing versions.json from CDN
const HTTPS_PROXY = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || "http://localhost:3128";

const proxyAwareFetch = (() => {
    console.log(`🌐 Using proxy for CDN requests: ${HTTPS_PROXY}`);
    const agent = new HttpsProxyAgent(HTTPS_PROXY);
    return (url, options = {}) => fetch(url, { ...options, agent });
})();

const versionsJsonUrl = `${CDN_BASE}/webcomponents/versions.json`;
let existingVersions = [];
try {
    const res = await proxyAwareFetch(versionsJsonUrl);
    if (res.ok) {
        existingVersions = await res.json();
        console.log(`📥 Fetched existing versions: ${existingVersions.join(', ')}`);
    } else {
        console.log('ℹ️ No existing versions.json found on CDN — starting fresh');
    }
} catch (e) {
    console.warn('⚠️ Could not fetch versions.json, using only current version:', e.message);
}

// ------------------------------------------------------------------
// 3. Download existing component files for each version
for (const version of existingVersions) {
    if (version === currentVersion) continue; // skip current (will rebuild)

    for (const name of COMPONENT_NAMES) {
        const remoteJsUrl = `${CDN_BASE}/webcomponents/${name}/${version}/${name}.js`;
        const remoteDtsUrl = `${CDN_BASE}/webcomponents/${name}/${version}/types/${name}.d.ts`;

        const localVersionDir = path.join(OUT_DIR, 'webcomponents', name, version);
        await fs.mkdir(localVersionDir, { recursive: true });

        // Download .js
        try {
            const jsRes = await proxyAwareFetch(remoteJsUrl);
            if (jsRes.ok) {
                const jsContent = await jsRes.text();
                await fs.writeFile(path.join(localVersionDir, `${name}.js`), jsContent);
                console.log(`  → ${name}@${version}.js`);
            }
        } catch (e) {
            console.warn(`    ⚠️ Failed to fetch ${remoteJsUrl}`);
        }

        // Download .d.ts (optional)
        try {
            const dtsRes = await proxyAwareFetch(remoteDtsUrl);
            if (dtsRes.ok) {
                const dtsContent = await dtsRes.text();
                const typesDir = path.join(localVersionDir, 'types');
                await fs.mkdir(typesDir, { recursive: true });
                await fs.writeFile(path.join(typesDir, `${name}.d.ts`), dtsContent);
                console.log(`  → ${name}@${version}/types/${name}.d.ts`);
            }
        } catch (e) {
            // optional, so ignore
        }
    }
}

// ------------------------------------------------------------------
// 4. Build current version from local source
console.log(`\n📦 Building current version: ${currentVersion}`);

// Copy static + icons
execSync('yarn copy:static && yarn copy:icons', { stdio: 'inherit', cwd: ROOT });

// Build all webcomponents via turbo (ensure they're built)
execSync('turbo run build --filter="./packages/webcomponents/*"', {
    cwd: monorepoRoot,
    stdio: 'inherit'
});

// Copy current version to OUT_DIR
const importMap = { imports: {} };
for (const name of COMPONENT_NAMES) {
    const pkgRoot = path.join(WEB_COMPONENTS_SRC, name);
    const pkgJson = JSON.parse(await fs.readFile(path.join(pkgRoot, 'package.json'), 'utf8'));
    const entry = pkgJson.module || 'dist/index.js';
    const entryFile = path.basename(entry); // e.g., ge-footer.js

    const srcDist = path.join(pkgRoot, 'dist');
    const destVer = path.join(OUT_DIR, 'webcomponents', name, currentVersion);

    await fs.rm(destVer, { recursive: true, force: true });
    await fs.cp(srcDist, destVer, { recursive: true });

    // Build import map
    importMap.imports[`@ael/${name}`] = `${CDN_BASE}/webcomponents/${name}/${currentVersion}/${entryFile}`;
}

// ------------------------------------------------------------------
// 5. Update versions list
const allVersions = [...new Set([...existingVersions, currentVersion])]
    .filter(v => semver.valid(v)) // safety
    .sort(semver.compare);

const versionsPath = path.join(OUT_DIR, 'webcomponents', 'versions.json');
await fs.mkdir(path.dirname(versionsPath), { recursive: true });
await fs.writeFile(versionsPath, JSON.stringify(allVersions, null, 2), 'utf8');
console.log(`✅ Wrote versions.json with: ${allVersions.join(', ')}`);

// ------------------------------------------------------------------
// 6. Create symlinks (latest, X.latest, etc.)
console.log('\n🔗 Creating semver symlinks...');

for (const name of COMPONENT_NAMES) {
    const componentDir = path.join(OUT_DIR, 'webcomponents', name);
    try {
        const entries = await fs.readdir(componentDir);
        const versions = [];
        for (const v of entries) {
            if (!semver.valid(v)) continue;
            const stat = await fs.stat(path.join(componentDir, v));
            if (stat.isDirectory()) {
                versions.push(v);
            }
        }

        if (versions.length === 0) continue;
        versions.sort(semver.compare);
        const absoluteLatest = versions[versions.length - 1];

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

        // X.Y.latest
        for (const [mm, v] of Object.entries(byMajorMinor)) {
            const link = path.join(componentDir, `${mm}.latest`);
            await fs.rm(link, { force: true });
            await fs.symlink(v, link, 'junction');
        }
        // X.latest
        for (const [m, v] of Object.entries(byMajor)) {
            const link = path.join(componentDir, `${m}.latest`);
            await fs.rm(link, { force: true });
            await fs.symlink(v, link, 'junction');
        }

        console.log(` ${name}/latest -> ${absoluteLatest}`);
    } catch (e) {
        console.error(`  ✗ Symlinks failed for ${name}:`, e.message);
    }
}

// ------------------------------------------------------------------
// 7. Build site
execSync(
    `parcel build ${SITE_ENTRY} --dist-dir ${OUT_DIR} --public-url / --no-content-hash`,
    { stdio: 'inherit', cwd: ROOT }
);

// ------------------------------------------------------------------
// 8. Write import-map
await fs.writeFile(path.join(OUT_DIR, 'import-map.json'), JSON.stringify(importMap, null, 2));

// ------------------------------------------------------------------
// 9. Inject build-version meta tag
const buildVersion = process.env.BUILD_VERSION || currentVersion;
let html = await fs.readFile(path.join(OUT_DIR, 'index.html'), 'utf8');
if (!html.includes('name="build-version"')) {
    html = html.replace(/<head[^>]*>/i, `$&\n  <meta name="build-version" content="${buildVersion}">`);
    await fs.writeFile(path.join(OUT_DIR, 'index.html'), html);
}

console.log(`\n🎉 CDN build complete. Current version: ${currentVersion}\n`);