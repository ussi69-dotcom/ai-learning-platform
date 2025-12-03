import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Playwright tests (separate config)
    "tests/**",
    "playwright.config.ts",
    // Generated API client
    "lib/api/**",
  ]),
  // Tech debt overrides - downgrade to warnings for gradual fix
  // TODO: Remove these overrides and fix the underlying issues
  {
    rules: {
      // Allow `any` temporarily - fix gradually
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unescaped quotes in JSX - mostly in diagram components
      "react/no-unescaped-entities": "warn",
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      // Hooks dependencies - warn only
      "react-hooks/exhaustive-deps": "warn",
      // React Hooks v7 / React Compiler rules - disable until codebase is refactored
      // TODO: Re-enable once setState patterns and Math.random() usage are fixed
      "react-compiler/react-compiler": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/set-state-in-render": "off",
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;
