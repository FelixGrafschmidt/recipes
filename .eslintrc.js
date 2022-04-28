module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/essential",
		"plugin:@typescript-eslint/recommended",
		"@nuxtjs/eslint-config-typescript"
	],
	parserOptions: {
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module"
	},
	plugins: [
		"vue",
		"@typescript-eslint"
	],
	rules: {
		indent: ["error", "tab"],
		"vue/html-indent": ["error", "tab"],
		"vue/script-indent": ["error", "tab"],
		"no-tabs": "off",
		"max-len": ["error", 240],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"space-before-function-paren": ["error", "never"]
	},
	overrides: [
		{
			files: ["*.vue"],
			rules: {
				indent: "off"
			}
		}
	]
};
