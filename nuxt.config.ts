import { presetAttributify, presetWind } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	buildModules: ["floating-vue/nuxt"],
	modules: ["@pinia/nuxt", "@unocss/nuxt", "nuxt-icon"],
	unocss: {
		// presets
		uno: true, // enabled `@unocss/preset-uno`
		icons: true, // enabled `@unocss/preset-icons`
		attributify: true, // enabled `@unocss/preset-attributify`,

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
	},
	vite: {},
});
