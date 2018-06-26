// jest.config.js
module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  roots: ["app/javascript"],
  setupTestFrameworkScriptFile: "/app/app/javascript/__tests__/test_setup.js",
  testRegex: "(/app/javascript/.*/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  verbose: true,
};
