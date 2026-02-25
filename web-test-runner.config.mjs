import { chromeLauncher } from "@web/test-runner-chrome";
import { transform } from "esbuild";
import fs from "fs";
import path from "path";

/**
 * Serves SVG files as ES module text exports.
 * Replaces Parcel's inline-string behaviour at test time.
 */
function svgInlinePlugin() {
  return {
    name: "svg-inline",
    resolveMimeType(context) {
      if (context.path.endsWith(".svg")) {
        return "js";
      }
    },
    transform(context) {
      if (context.path.endsWith(".svg")) {
        const filePath = path.join(process.cwd(), context.path);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8");
          return { body: `export default ${JSON.stringify(content)};` };
        }
        return { body: `export default '<svg></svg>';` };
      }
    },
  };
}

/**
 * Stubs CSS imports (from @fontsource, @material/web, etc.)
 * as empty JS modules.
 */
function cssStubPlugin() {
  return {
    name: "css-stub",
    resolveMimeType(context) {
      if (context.path.endsWith(".css")) {
        return "js";
      }
    },
    transform(context) {
      if (context.path.endsWith(".css")) {
        return { body: "export default '';" };
      }
    },
  };
}

/**
 * Resolves workspace @ael/* packages to source files (not dist/).
 * Fixes @ael/icons double "common" path from the exports map.
 */
function aelResolvePlugin() {
  return {
    name: "ael-resolve",
    resolveImport({ source }) {
      if (source === "@ael/svg-wrapper-utils") {
        return "/packages/utils/svg-wrapper/src/index.js";
      }
      if (source.startsWith("@ael/icons/")) {
        const subpath = source.replace("@ael/icons/", "");
        return `/packages/icons/${subpath}`;
      }
    },
  };
}

/**
 * Transforms ONLY files in packages/ with esbuild (decorator support).
 * Does NOT touch node_modules — avoids breaking third-party ESM.
 */
function decoratorTransformPlugin() {
  return {
    name: "decorator-transform",
    async transform(context) {
      if (
        context.path.startsWith("/packages/") &&
        context.path.endsWith(".js") &&
        !context.path.includes("node_modules")
      ) {
        const result = await transform(context.body, {
          loader: "ts",
          target: "esnext",
          sourcemap: "inline",
          tsconfigRaw: JSON.stringify({
            compilerOptions: {
              experimentalDecorators: true,
              useDefineForClassFields: false,
            },
          }),
        });
        return { body: result.code };
      }
    },
  };
}

export default {
  files: "packages/**/test/**/*.test.js",
  nodeResolve: true,
  rootDir: ".",
  browsers: [
    chromeLauncher({
      launchOptions: {
        executablePath: "/usr/bin/chromium-browser",
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
        ],
      },
    }),
  ],
  plugins: [
    aelResolvePlugin(),
    svgInlinePlugin(),
    cssStubPlugin(),
    decoratorTransformPlugin(),
  ],
  testFramework: {
    config: {
      timeout: 5000,
    },
  },
};
