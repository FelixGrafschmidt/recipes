import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ["@pinia/nuxt", "@unocss/nuxt", "nuxt-icon", "@vueuse/nuxt"],
	vite: {},
	experimental: {
		writeEarlyHints: false,
	},
});
