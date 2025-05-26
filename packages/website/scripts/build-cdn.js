/* eslint-disable no-console */
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {execSync} from 'child_process';

const __dirname    = path.dirname(fileURLToPath(import.meta.url));
const ROOT         = path.resolve(__dirname, '..');                 // packages/website
const OUT_DIR      = path.join(ROOT, 'dist');
const CDN_BASE     = 'https://static.app.ge.ch/';           // ⬅️ adjust
const NODE_MODULES = path.resolve(ROOT, '../../node_modules/@ael');
const SITE_ENTRY   = './static/index.html';

console.log("ROOT =", ROOT);

// ---------------------------------------------------------------------------
// 1. copy static + icons  ----------------------------------------------------
execSync('yarn copy:static && yarn copy:icons', { stdio: 'inherit' });

// ---------------------------------------------------------------------------
// 2. copy every web‑component ------------------------------------------------
const importMap = { imports: {} };

const componentPkgs = (await fs.readdir(NODE_MODULES))
    .filter(name => name.startsWith('ge-'));

for (const name of componentPkgs) {
    const pkgRoot = path.join(NODE_MODULES, name);
    const { version, module: modField = 'dist/index.js', main } = JSON.parse(
        await fs.readFile(path.join(pkgRoot, 'package.json'), 'utf8')
    );
    const entry = (modField || main || 'dist/index.js').replace(/^dist[\\/]/, '');

    const srcDist  = path.join(pkgRoot, 'dist');
    const destVer  = path.join(OUT_DIR, 'webcomponents', name, version);
    const destLast = path.join(OUT_DIR, 'webcomponents', name, 'latest');

    // copy to versioned folder
    await fs.cp(srcDist, destVer, { recursive: true });
    // copy (or overwrite) "latest"
    await fs.rm(destLast, { recursive: true, force: true });
    await fs.cp(srcDist, destLast, { recursive: true });

    console.log(`• ${name}@${version}`);

    // build the import‑map entry
    importMap.imports[`@ael/${name}`] = new URL(`webcomponents/${name}/${version}/${entry}`, CDN_BASE).href;
}

// ---------------------------------------------------------------------------
// 3. build the site with Parcel ---------------------------------------------
execSync(
    `parcel build ${SITE_ENTRY} --dist-dir ${OUT_DIR} --no-content-hash`,
    { stdio: 'inherit', cwd: ROOT }
);

// ---------------------------------------------------------------------------
// 4. write the import‑map ----------------------------------------------------
const mapPath = path.join(OUT_DIR, 'import-map.json');
await fs.writeFile(mapPath, JSON.stringify(importMap, null, 2));
console.log(`✓ import‑map written → site/import-map.json`);

//--------------------------------------------------------------------------
// 5. Injection de <meta name="build-version"> dans index.html
const buildVersion = process.env.BUILD_VERSION || JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8')).version;

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

console.log('\n🎉  CDN build complete.\n');
