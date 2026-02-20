const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../../..");

/**
 * Vite plugin: serves SVG files as ES module default string exports.
 * Mirrors the inline-string behaviour used by Parcel at build time.
 */
function svgInlinePlugin() {
  return {
    name: "svg-inline",
    transform(code, id) {
      if (id.endsWith(".svg")) {
        const content = fs.readFileSync(id, "utf-8");
        return { code: `export default ${JSON.stringify(content)};` };
      }
    },
  };
}

/**
 * Vite plugin: transforms .js files in packages/ with esbuild using the
 * TypeScript loader so that Lit decorators (@customElement, @property, @state)
 * are compiled down to standard JS. Same pattern as web-test-runner.config.mjs.
 */
function decoratorTransformPlugin() {
  return {
    name: "decorator-transform",
    enforce: "pre",
    async transform(code, id) {
      if (
        id.includes(path.join(root, "packages")) &&
        id.endsWith(".js") &&
        !id.includes("node_modules")
      ) {
        const esbuild = require("esbuild");
        const result = await esbuild.transform(code, {
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
        return { code: result.code, map: null };
      }
    },
  };
}

/** @type {import('@storybook/web-components-vite').StorybookConfig} */
module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@ael/svg-wrapper-utils": path.resolve(root, "packages/utils/svg-wrapper/src/index.js"),
      "@ael/icons": path.resolve(root, "packages/icons"),
      "@icons/common": path.resolve(root, "packages/icons/common"),
    };

    config.plugins = config.plugins || [];
    config.plugins.push(svgInlinePlugin());
    config.plugins.push(decoratorTransformPlugin());

    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      "lit",
      "@lit/reactive-element",
      "lit-html",
      "lit-element",
    ];

    return config;
  },
};
