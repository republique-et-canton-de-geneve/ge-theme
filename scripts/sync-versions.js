#!/usr/bin/env node

/**
 * sync-versions.js
 *
 * Synchronizes all workspace package versions with the root package.json version.
 * Also updates internal @ael/* dependency references to match.
 *
 * Usage:
 *   node scripts/sync-versions.js
 *   yarn version:sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Read root package.json
const rootPkgPath = path.join(root, 'package.json');
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));

// Normalize version: strip -SNAPSHOT.N suffix for package versions
const rawVersion = rootPkg.version;
const version = rawVersion.replace(/-SNAPSHOT\.\d+$/, '');

console.log(`\n📦 Syncing versions to: ${version}`);
if (rawVersion !== version) {
    console.log(`   (from root: ${rawVersion})\n`);
} else {
    console.log();
}

/**
 * Recursively find all package.json files in a directory (1 level deep)
 */
function findPackages(dir) {
    const packages = [];

    if (!fs.existsSync(dir)) return packages;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const pkgPath = path.join(dir, entry.name, 'package.json');
        if (fs.existsSync(pkgPath)) {
            packages.push(pkgPath);
        }
    }

    return packages;
}

// Collect all workspace package.json paths
const workspacePackages = [
    path.join(root, 'packages/icons/package.json'),
    path.join(root, 'packages/website/package.json'),
    ...findPackages(path.join(root, 'packages/utils')),
    ...findPackages(path.join(root, 'packages/webcomponents')),
].filter(p => fs.existsSync(p));

let updatedCount = 0;
let skippedCount = 0;

for (const pkgPath of workspacePackages) {
    const relativePath = path.relative(root, pkgPath);

    try {
        const content = fs.readFileSync(pkgPath, 'utf8');
        const pkg = JSON.parse(content);
        const oldVersion = pkg.version;

        let modified = false;

        // Update package version
        if (pkg.version !== version) {
            pkg.version = version;
            modified = true;
        }

        // Update @ael/* dependencies
        for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
            if (!pkg[depType]) continue;

            for (const depName of Object.keys(pkg[depType])) {
                if (depName.startsWith('@ael/') && pkg[depType][depName] !== version) {
                    pkg[depType][depName] = version;
                    modified = true;
                }
            }
        }

        if (modified) {
            // Preserve original formatting (2-space indent, trailing newline)
            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
            console.log(`  ✓ ${relativePath} (${oldVersion} → ${version})`);
            updatedCount++;
        } else {
            skippedCount++;
        }

    } catch (err) {
        console.error(`  ✗ ${relativePath}: ${err.message}`);
    }
}

console.log(`\n✅ Done: ${updatedCount} updated, ${skippedCount} already in sync\n`);