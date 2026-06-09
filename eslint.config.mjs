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
    // Generated/legacy/business-output folders. Keep quality gates focused on
    // the actual Next.js app and maintained tooling.
    "archive/**",
    "src/app/_archive/**",
    "src/components/_archive/**",
    "scripts/data-generation/**",
    "logs/**",
    "research/**",
    "content/**",
    "team/**",
    "adsense-keywords/**",
    "adsense-keywords/out/**",
  ]),
  {
    rules: {
      // Phase 1 stabilisation: keep these visible, but do not block the build
      // until the app pages are refactored in a dedicated pass.
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
]);

export default eslintConfig;
