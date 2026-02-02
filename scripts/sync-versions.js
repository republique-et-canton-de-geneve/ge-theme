#!/usr/bin/env node

/**
 * sync-versions.js
 *
 * Reads every workspace package's own version and updates internal @ael/*
 * dependency references so they point to the correct local version.
 *
 * Does NOT overwrite each package's version — components own their lifecycle.
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

// ---------------------------------------------------------------
// 1. Collect all workspace package.json paths
// ---------------------------------------------------------------
function findPackages(dir) {
    const packages = [];
    if (!fs.existsSync(dir)) return packages;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const pkgPath = path.join(dir, entry.name, 'package.json');
        if (fs.existsSync(pkgPath)) packages.push(pkgPath);
    }
    return packages;
}

const workspacePackages = [
    path.join(root, 'packages/icons/package.json'),
    path.join(root, 'packages/website/package.json'),
    ...findPackages(path.join(root, 'packages/utils')),
    ...findPackages(path.join(root, 'packages/webcomponents')),
].filter(p => fs.existsSync(p));

// ---------------------------------------------------------------
// 2. Build a map of @ael/<name> → normalised version
// ---------------------------------------------------------------
/** @type {Record<string, string>} e.g. { "@ael/ge-footer": "1.2.0" } */
const versionMap = {};

for (const pkgPath of workspacePackages) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.name?.startsWith('@ael/')) {
        versionMap[pkg.name] = pkg.version.replace(/-SNAPSHOT\.\d+$/, '');
    }
}

console.log('\n📦 Workspace versions:');
for (const [name, ver] of Object.entries(versionMap)) {
    console.log(`   ${name} → ${ver}`);
}
console.log();

// ---------------------------------------------------------------
// 3. Update @ael/* dependency references in every workspace package
// ---------------------------------------------------------------
let updatedCount = 0;
let skippedCount = 0;

for (const pkgPath of workspacePackages) {
    const relativePath = path.relative(root, pkgPath);
    try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        let modified = false;

        for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
            if (!pkg[depType]) continue;

            for (const depName of Object.keys(pkg[depType])) {
                if (!depName.startsWith('@ael/')) continue;

                const expected = versionMap[depName];
                if (!expected) continue; // external @ael package, leave as-is

                if (pkg[depType][depName] !== expected) {
                    const old = pkg[depType][depName];
                    pkg[depType][depName] = expected;
                    console.log(`  ✓ ${relativePath}  ${depName}: ${old} → ${expected}`);
                    modified = true;
                }
            }
        }

        if (modified) {
            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
            updatedCount++;
        } else {
            skippedCount++;
        }
    } catch (err) {
        console.error(`  ✗ ${relativePath}: ${err.message}`);
    }
}

console.log(`\n✅ Done: ${updatedCount} updated, ${skippedCount} already in sync\n`);