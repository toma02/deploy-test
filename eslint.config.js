import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/**", "node_modules/**"] },
  js.configs.recommended,
  {
    files: ["script.js"],
    languageOptions: { globals: globals.browser, sourceType: "module" },
  },
  {
    files: ["*.config.js"],
    languageOptions: { globals: globals.node, sourceType: "module" },
  },
];
