const base = require("../jest.config");

/** @type { import("@jest/types").Config.InitialOptions } */
const config = {
  ...base,
  rootDir: ".",
  testRegex: ".e2e-spec.ts$",
};

module.exports = config;
