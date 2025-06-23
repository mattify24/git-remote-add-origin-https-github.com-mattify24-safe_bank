import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin"; // ensure this is correct
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], // JavaScript files
    plugins: { js },
    extends: ["js/recommended"],
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    languageOptions: {
      sourceType: "script",
    },
  },
  {
    files: ["**/*.{ts,mts}"], // TypeScript files
    parser: "@typescript-eslint/parser",
    plugins: { "@typescript-eslint": tseslint },
    extends: [
      "plugin:@typescript-eslint/recommended",
    ],
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
]);