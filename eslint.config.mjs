import jasmine from "eslint-plugin-jasmine";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    plugins: {
        jasmine,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jasmine,
            ...globals.node,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "no-var": "warn",

        "no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "no-multi-str": 1,
        "prefer-const": "warn",
    },
},
{
    // Note: there should be no other properties in this object
    ignores: [
        "**/node_modules/**",
        "**/build/**",
        "**/build_tests/**",
    ]
}
];