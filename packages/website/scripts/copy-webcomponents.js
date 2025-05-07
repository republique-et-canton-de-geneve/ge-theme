import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NODE_MODULES = path.resolve(__dirname, '../../../node_modules/@ael');
const DEST_ROOT = path.resolve(__dirname, '../dist/webcomponents');

const pkgs = (await fs.readdir(NODE_MODULES))
    .filter(name => name.startsWith('ge-'));

for (const name of pkgs) {
    const src  = path.join(NODE_MODULES, name, 'dist');
    const dest = path.join(DEST_ROOT,      name);

    await fs.cp(src, dest, { recursive: true });
    console.log(`• ${name} → webcomponents/${name}`);
}
