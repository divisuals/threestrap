module.exports = {
  plugins: ["jasmine"],
  env: {
    browser: true,
    es2021: true,
    jasmine: true,
    node: true,
  },
  ignores: [
    "**/node_modules/**",
    "**/build/**",
    "**/build_tests/**",
  ],  
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-var": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-multi-str": 1,
    "prefer-const": "warn"
  },
};
