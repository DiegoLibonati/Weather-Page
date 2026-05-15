import "@testing-library/jest-dom";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

beforeAll((): void => {
  mockMswServer.listen({ onUnhandledRequest: "error" });
});

afterEach((): void => {
  mockMswServer.resetHandlers();
});

afterAll((): void => {
  mockMswServer.close();
});

const originalConsoleError = console.error.bind(console);

console.error = (...args: unknown[]): void => {
  if (
    String(args[0]).includes(
      "Not implemented: HTMLFormElement.prototype.requestSubmit"
    )
  )
    return;
  originalConsoleError(...args);
};
