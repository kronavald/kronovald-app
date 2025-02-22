import pluginQuery from "@tanstack/eslint-plugin-query"

import pluginJs from "@eslint/js"
import jsxA11y from "eslint-plugin-jsx-a11y"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tailwind from "eslint-plugin-tailwindcss"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ["dist"] },
    { files: ["**/*.{ts,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        settings: {
            react: {
                version: "18.3.1",
            },
        },
        ...reactPlugin.configs.flat.recommended,
    },
    reactPlugin.configs.flat["jsx-runtime"],
    reactRefresh.configs.recommended,
    {
        plugins: {
            "react-hooks": reactHooks,
        },
        rules: { ...reactHooks.configs.recommended.rules },
    },
    ...tailwind.configs["flat/recommended"],
    jsxA11y.flatConfigs.recommended,
    ...pluginQuery.configs["flat/recommended"],
]
