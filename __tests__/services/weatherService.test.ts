import weatherService from "@/services/weatherService";

import { mockWeather } from "@tests/__mocks__/weather.mock";

jest.mock("@/constants/envs", () => {
  const mockData = jest.requireActual("@tests/__mocks__/envs.mock");
  const { mockEnvs } = mockData;
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("weatherService", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getWeatherInformation", () => {
    describe("when the request succeeds", () => {
      it("should return the parsed weather data", async () => {
        mockFetchSuccess(mockWeather);
        const result = await weatherService.getWeatherInformation("Argentina");
        expect(result).toEqual(mockWeather);
      });

      it("should call fetch with the correct URL and method", async () => {
        mockFetchSuccess(mockWeather);
        await weatherService.getWeatherInformation("Argentina");
        expect(global.fetch).toHaveBeenCalledWith(
          "/weather?q=Argentina&appid=YOUR_API_KEY",
          { method: "GET" }
        );
      });

      it("should call fetch with the encoded country name", async () => {
        mockFetchSuccess(mockWeather);
        await weatherService.getWeatherInformation("New York");
        expect(global.fetch).toHaveBeenCalledWith(
          "/weather?q=New York&appid=YOUR_API_KEY",
          { method: "GET" }
        );
      });
    });

    describe("when the request fails with an HTTP error", () => {
      it("should throw an error with the 404 status code", async () => {
        mockFetchError(404);
        await expect(
          weatherService.getWeatherInformation("UnknownCity")
        ).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with the 500 status code", async () => {
        mockFetchError(500);
        await expect(
          weatherService.getWeatherInformation("SomeCity")
        ).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with the 401 status code", async () => {
        mockFetchError(401);
        await expect(
          weatherService.getWeatherInformation("SomeCity")
        ).rejects.toThrow("HTTP error! status: 401");
      });
    });

    describe("when the request fails with a network error", () => {
      it("should throw the network error", async () => {
        mockFetchNetworkError("Network error");
        await expect(
          weatherService.getWeatherInformation("SomeCity")
        ).rejects.toThrow("Network error");
      });
    });
  });
});
