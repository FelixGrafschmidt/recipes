import { defineConfig, presetAttributify, presetWind } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import transformerDirectives from "@unocss/transformer-directives";
export default defineConfig({
	// core options
	shortcuts: [],
	rules: [],
	presets: [
		presetWind(),
		presetAttributify(),
		presetScrollbar({
			// config
		}),
	],
	transformers: [transformerDirectives()],
});
