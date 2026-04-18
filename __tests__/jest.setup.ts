import "@testing-library/jest-dom";

import { mockEnvs } from "@tests/__mocks__/envs.mock";

const mockFetch = jest.fn();

global.fetch = mockFetch;

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: mockEnvs,
}));
