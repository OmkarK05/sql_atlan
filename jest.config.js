module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"]
  }
}
