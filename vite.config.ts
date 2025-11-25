/** @format */

import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";

export default defineConfig({
	plugins: [wasm(), topLevelAwait()],
	optimizeDeps: {
		exclude: ["@xenova/transformers"],
	},
	worker: {
		format: "es",
		plugins: () => [wasm(), topLevelAwait()],
	},
});
