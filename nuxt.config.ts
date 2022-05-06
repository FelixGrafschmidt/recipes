import { defineNuxtConfig } from "nuxt";
import { presetWind, transformerDirectives } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	buildModules: ["@unocss/nuxt", "floating-vue/nuxt"],
	modules: ["@nuxtjs/color-mode"],
	target: "static",
	unocss: {
		presets: [
			presetWind(),
			presetScrollbar({
				scrollbarThumbColor: "#1f2937",
				scrollbarTrackColor: "#4b5563"
			})
		],

		transformers: [
			transformerDirectives()
		]
	},
	vite: {
		plugins: [
			eslintPlugin()
		]
	},
	typescript: {
		strict: true
	}
});
