module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/vue3-recommended",
    "plugin:nuxt/recommended",
    "eslint:recommended",
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
    "max-len": ["error", 240],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "space-before-function-paren": ["error", "never"]
  }
};
