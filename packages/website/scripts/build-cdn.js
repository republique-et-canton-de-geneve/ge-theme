/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {execSync} from 'child_process';
import semver from 'semver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // packages/website
const OUT_DIR = path.resolve(ROOT, '../../build');
const CDN_BASE = 'https://static.app.ge.ch/';
const NODE_MODULES = path.resolve(ROOT, '../../node_modules/@ael');
const SITE_ENTRY = './static/index.html';
const monorepoRoot = path.resolve(ROOT, '../..');

const REBUILD_HISTORICAL = process.env.REBUILD_HISTORICAL === 'true';

console.log("ROOT =", ROOT);
console.log("process.env.REBUILD_HISTORICAL =", process.env.REBUILD_HISTORICAL);
console.log("REBUILD_HISTORICAL =", REBUILD_HISTORICAL);

// ---------------------------------------------------------------------------
// 1. copy static + icons  ----------------------------------------------------
execSync('yarn copy:static && yarn copy:icons', { stdio: 'inherit' });

// ---------------------------------------------------------------------------
// 2. Build current version webcomponents ------------------------------------
const rootPkgVersion = JSON.parse(
    await fs.readFile(path.join(monorepoRoot, 'package.json'), 'utf8')
).version;

console.log(`\nBuilding current version: ${rootPkgVersion}`);

const importMap = { imports: {} };
const componentPkgs = (await fs.readdir(NODE_MODULES))
    .filter(name => name.startsWith('ge-'));

for (const name of componentPkgs) {
    const pkgRoot = path.join(NODE_MODULES, name);
    const { version, module: modField = 'dist/index.js', main } = JSON.parse(
        await fs.readFile(path.join(pkgRoot, 'package.json'), 'utf8')
    );
    const entry = (modField || main || 'dist/index.js').replace(/^dist[\\/]/, '');

    const srcDist = path.join(pkgRoot, 'dist');
    const destVer = path.join(OUT_DIR, 'webcomponents', name, version);

    // Copy to versioned folder (overwrite if exists)
    await fs.rm(destVer, { recursive: true, force: true });
    await fs.cp(srcDist, destVer, { recursive: true });

    console.log(`  • ${name}@${version}`);

    // Build import-map entry for current version
    importMap.imports[`@ael/${name}`] = new URL(`webcomponents/${name}/${version}/${entry}`, CDN_BASE).href;
}

// ---------------------------------------------------------------------------
// 3. Build historical tagged versions (if requested) ------------------------
if (REBUILD_HISTORICAL) {
    console.log('\n🔄 Rebuilding historical versions from git tags...');

    const tagsOutput = execSync('git tag -l "v*"', {
        cwd: monorepoRoot,
        encoding: 'utf8'
    }).trim();

    if (!tagsOutput) {
        console.log('No release tags found.');
    } else {
        const tags = tagsOutput.split('\n').filter(Boolean);
        const tagVersions = tags.map(t => t.replace(/^v/, '')).sort((a, b) => {
            const [aMaj, aMin, aPat] = a.split('.').map(Number);
            const [bMaj, bMin, bPat] = b.split('.').map(Number);
            return (aMaj - bMaj) || (aMin - bMin) || (aPat - bPat);
        });

        console.log(`Found ${tagVersions.length} tagged versions`);

        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
            cwd: monorepoRoot,
            encoding: 'utf8'
        }).trim();

        for (const tagVersion of tagVersions) {
            const sampleComponent = componentPkgs[0];
            const checkPath = path.join(OUT_DIR, 'webcomponents', sampleComponent, tagVersion);

            if (tagVersion !== rootPkgVersion) {
                try {
                    await fs.access(checkPath);
                    console.log(`  ⏭  ${tagVersion} already exists, skipping`);
                    continue;
                } catch {
                    // Doesn't exist, need to build
                }
            }

            console.log(`  📦 Building ${tagVersion}...`);

            try {
                execSync(`git checkout -q v${tagVersion}`, {
                    cwd: monorepoRoot,
                    stdio: 'pipe'
                });

                execSync('yarn install --frozen-lockfile', {
                    cwd: monorepoRoot,
                    stdio: 'pipe'
                });

                execSync('turbo run build --filter="./packages/webcomponents/*"', {
                    cwd: monorepoRoot,
                    stdio: 'pipe'
                });

                for (const name of componentPkgs) {
                    const pkgRoot = path.join(monorepoRoot, 'node_modules/@ael', name);
                    const srcDist = path.join(pkgRoot, 'dist');
                    const destVer = path.join(OUT_DIR, 'webcomponents', name, tagVersion);

                    await fs.rm(destVer, { recursive: true, force: true });
                    await fs.cp(srcDist, destVer, { recursive: true });
                }

                console.log(`    ✓ ${tagVersion} built`);

            } catch (error) {
                console.error(`    ✗ Failed to build ${tagVersion}:`, error.message);
            }
        }

        console.log(`\n🔙 Restoring ${currentBranch}...`);
        execSync(`git checkout -q ${currentBranch}`, { cwd: monorepoRoot });
        execSync('yarn install --frozen-lockfile', { cwd: monorepoRoot, stdio: 'inherit' });
    }
}

// ---------------------------------------------------------------------------
// 4. Create semver-based symlinks (latest, X.latest, X.Y.latest) -----------
console.log('\n🔗 Creating semver symlinks...');

for (const name of componentPkgs) {
    const componentDir = path.join(OUT_DIR, 'webcomponents', name);

    try {
        const entries = await fs.readdir(componentDir);

        // Filter to only version folders (not symlinks)
        const versions = [];
        for (const entry of entries) {
            const stat = await fs.lstat(path.join(componentDir, entry));
            if (stat.isDirectory() && semver.valid(entry)) {
                versions.push(entry);
            }
        }

        if (versions.length === 0) continue;

        // Sort versions
        versions.sort(semver.compare);

        // Group by major.minor
        const versionsByMajorMinor = {};
        const versionsByMajor = {};

        for (const version of versions) {
            const major = semver.major(version);
            const minor = semver.minor(version);
            const key = `${major}.${minor}`;

            // Track latest for each major.minor
            if (!versionsByMajorMinor[key] || semver.gt(version, versionsByMajorMinor[key])) {
                versionsByMajorMinor[key] = version;
            }

            // Track latest for each major
            if (!versionsByMajor[major] || semver.gt(version, versionsByMajor[major])) {
                versionsByMajor[major] = version;
            }
        }

        // Create 'latest' symlink (absolute latest)
        const absoluteLatest = versions[versions.length - 1];
        const latestLink = path.join(componentDir, 'latest');
        await fs.rm(latestLink, { recursive: true, force: true });
        await fs.symlink(absoluteLatest, latestLink, 'junction');
        console.log(`  ${name}/latest -> ${absoluteLatest}`);

        // Create X.Y.latest symlinks
        for (const [key, latestVersion] of Object.entries(versionsByMajorMinor)) {
            const link = path.join(componentDir, `${key}.latest`);
            await fs.rm(link, { recursive: true, force: true });
            await fs.symlink(latestVersion, link, 'junction');
            console.log(`  ${name}/${key}.latest -> ${latestVersion}`);
        }

        // Create X.latest symlinks
        for (const [major, latestVersion] of Object.entries(versionsByMajor)) {
            const link = path.join(componentDir, `${major}.latest`);
            await fs.rm(link, { recursive: true, force: true });
            await fs.symlink(latestVersion, link, 'junction');
            console.log(`  ${name}/${major}.latest -> ${latestVersion}`);
        }

    } catch (error) {
        console.error(`  ✗ Failed to create symlinks for ${name}:`, error.message);
    }
}

// ---------------------------------------------------------------------------
// 5. build the site with Parcel ---------------------------------------------
execSync(
    `parcel build ${SITE_ENTRY} --dist-dir ${OUT_DIR} --public-url / --no-content-hash`,
    { stdio: 'inherit', cwd: ROOT }
);

// ---------------------------------------------------------------------------
// 6. write the import-map ----------------------------------------------------
const mapPath = path.join(OUT_DIR, 'import-map.json');
await fs.writeFile(mapPath, JSON.stringify(importMap, null, 2));
console.log(`✓ import-map written → import-map.json`);

// ---------------------------------------------------------------------------
// 7. Inject build-version meta tag ------------------------------------------
const buildVersion = process.env.BUILD_VERSION || rootPkgVersion;

const indexPath = path.join(OUT_DIR, 'index.html');
let html = await fs.readFile(indexPath, 'utf8');

if (!html.includes('name="build-version"')) {
    html = html.replace(
        /<head[^>]*>/i,
        (m) => `${m}\n  <meta name="build-version" content="${buildVersion}">`
    );
    await fs.writeFile(indexPath, html);
    console.log(`✓ injected build-version ${buildVersion}`);
}

console.log('\n🎉 CDN build complete.\n');