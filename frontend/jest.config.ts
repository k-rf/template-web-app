import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "@happy-dom/jest-environment",
  testMatch: ["<rootDir>/snapshot.jest.spec.tsx"],
};

export default config;
