import { mockEnvs } from "@tests/__mocks__/envs.mock";

jest.mock("@/constants/envs", () => {
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

import weatherService from "@/services/weatherService";

import { mockWeather } from "@tests/__mocks__/weather.mock";

const mockedFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("weatherService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch weather information successfully", async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWeather),
    } as Response);

    const result = await weatherService.getWeatherInformation("Argentina");

    expect(result).toEqual(mockWeather);
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining("Argentina"),
      expect.objectContaining({ method: "GET" })
    );
  });

  it("should throw error when weather fetch fails", async () => {
    mockedFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(
      weatherService.getWeatherInformation("InvalidCity")
    ).rejects.toThrow("HTTP error! status: 404");
  });

  it("should throw error on network failure", async () => {
    mockedFetch.mockRejectedValue(new Error("Network error"));

    await expect(
      weatherService.getWeatherInformation("Argentina")
    ).rejects.toThrow("Network error");
  });
});
