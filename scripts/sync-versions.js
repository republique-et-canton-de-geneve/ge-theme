// scripts/sync-version.js
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import semver from 'semver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Read root version
const rootPkg = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
let version = rootPkg.version;

// Normalize: strip -SNAPSHOT.x or any prerelease suffix for internal packages
if (semver.prerelease(version)) {
    version = semver.coerce(version).version;
    console.log(`⚠️ Root version is prerelease. Using normalized version: ${version}`);
} else {
    console.log(`Using version: ${version}`);
}

// Helper to update a package.json file
async function updatePackage(pkgPath, newVersion) {
    const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));
    const originalVersion = pkg.version;
    let depsUpdated = false;

    // Update package version
    if (pkg.version !== newVersion) {
        pkg.version = newVersion;
    }

    // Update all @ael/* dependencies in all dependency sections
    const depTypes = ['dependencies', 'devDependencies', 'optionalDependencies'];
    for (const depType of depTypes) {
        if (pkg[depType]) {
            for (const dep of Object.keys(pkg[depType])) {
                if (dep.startsWith('@ael/')) {
                    pkg[depType][dep] = newVersion;
                    depsUpdated = true;
                }
            }
        }
    }

    // Write only if changed
    if (originalVersion !== newVersion || depsUpdated) {
        await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
        console.log(`  ✓ ${pkg.name}@${newVersion}${depsUpdated ? ' (deps synced)' : ''}`);
    }
}

console.log(`Syncing version ${version} to all packages...`);

// Update all webcomponents
const componentsDir = path.join(ROOT, 'packages/webcomponents');
for (const name of await fs.readdir(componentsDir)) {
    const pkgPath = path.join(componentsDir, name, 'package.json');
    try {
        await updatePackage(pkgPath, version);
    } catch (e) {
        // Skip if not a package folder
    }
}

// Update icons
await updatePackage(path.join(ROOT, 'packages/icons/package.json'), version);

// Update utils (if any have @ael deps)
const utilsDir = path.join(ROOT, 'packages/utils');
try {
    for (const name of await fs.readdir(utilsDir)) {
        const pkgPath = path.join(utilsDir, name, 'package.json');
        try {
            await updatePackage(pkgPath, version);
        } catch (e) {
            // skip
        }
    }
} catch (e) {
    // utils may not exist or be empty
}

// Update website (dependencies only — keep its own version as 1.0.0)
await updatePackage(path.join(ROOT, 'packages/website/package.json'), version);

console.log('✓ Version and dependency sync complete\n');