export default {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

process.env = Object.assign(process.env, {
  VITE_API_KEY: "YOUR API KEY [OPTIONAL HERE]",
  VITE_API_URL: "YOUR API URL [OPTIONAL HERE]",
});
