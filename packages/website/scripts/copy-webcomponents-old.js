// Copy every @ael/ge-* workspace's dist/* into website/dist/webcomponents/<pkg>/
/* eslint-disable no-console */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NODE_MODULES = path.resolve(__dirname, "../../../node_modules/@ael");
const DEST_ROOT    = path.resolve(__dirname, "../dist/webcomponents");

async function copyFile(src, destDir) {
    await fs.mkdir(destDir, { recursive: true });
    const dest = path.join(destDir, path.basename(src));
    await fs.copyFile(src, dest);
}

async function main () {
    const entries = await fs.readdir(NODE_MODULES, { withFileTypes: true });

    // pick every "@ael/ge-*" package
    const componentPkgs = entries
        .filter(e => (e.isDirectory() || e.isSymbolicLink()) && e.name.startsWith("ge-"))
        .map(e => e.name);

    for (const pkg of componentPkgs) {
        const distDir = path.join(NODE_MODULES, pkg, "dist");
        let files;
        try {
            files = await fs.readdir(distDir);
        } catch {            // no dist folder ⇒ skip
            continue;
        }
        for (const file of files) {
            const src  = path.join(distDir, file);
            const dest = path.join(DEST_ROOT, pkg);       // <webcomponents>/<pkg>/
            await copyFile(src, dest);
            console.log(`• ${pkg}/${file}`);
        }
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
