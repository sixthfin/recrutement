/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@sixthfin-auth/eslint-config/index.js",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["@tanstack/query"],
  root: true,
};
