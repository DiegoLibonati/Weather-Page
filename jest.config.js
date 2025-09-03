export default {
  preset: "ts-jest",
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
};

process.env = Object.assign(process.env, {
  VITE_API_KEY: "YOUR API KEY [OPTIONAL HERE]",
  VITE_API_URL: "YOUR API URL [OPTIONAL HERE]",
});
