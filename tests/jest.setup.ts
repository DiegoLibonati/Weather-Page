import "@testing-library/jest-dom";

jest.mock("@src/constants/envs", () => {
  return {
    __esModule: true,
    default: { API_KEY: "YOUR_API_KEY", API_URL: "YOUR_API_URL" },
  };
});
