module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:perfectionist/recommended-natural-legacy",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "perfectionist"],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "perfectionist/sort-imports": [
      "error",
      {
        customGroups: {
          type: {
            core: ["react", "zod"],
            workspace: "@sixthfin-auth/*",
          },
          value: {
            core: ["react", "react-dom/client", "zod"],
            workspace: "@sixthfin-auth/*",
          },
        },
        groups: [
          "type",
          "core",
          ["builtin", "external"],
          "internal-type",
          "internal",
          "workspace",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        order: "desc",
        type: "natural",
      },
    ],
  },
};
