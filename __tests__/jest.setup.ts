import "@testing-library/jest-dom";

import { mockEnvs } from "@tests/__mocks__/envs.mock";

const mockFetch = jest.fn();
const originalConsoleError = console.error.bind(console);

global.fetch = mockFetch;

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: mockEnvs,
}));

console.error = (...args: unknown[]): void => {
  if (
    String(args[0]).includes(
      "Not implemented: HTMLFormElement.prototype.requestSubmit"
    )
  )
    return;
  originalConsoleError(...args);
};
