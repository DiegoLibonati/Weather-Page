import { http, HttpResponse } from "msw";

import weatherService from "@/services/weatherService";

import { mockMswServer } from "@tests/__mocks__/mswServer.mock";
import { mockWeather } from "@tests/__mocks__/weather.mock";

jest.mock("@/constants/envs", () => {
  const mockData = jest.requireActual("@tests/__mocks__/envs.mock");
  const { mockEnvs } = mockData;
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

describe("weatherService", () => {
  describe("getWeatherInformation", () => {
    describe("when the request succeeds", () => {
      it("should return the parsed weather data", async () => {
        const result = await weatherService.getWeatherInformation("Argentina");

        expect(result).toEqual(mockWeather);
      });

      it("should call the weather endpoint with the correct query params", async () => {
        let capturedQ: string | null = null;
        let capturedAppid: string | null = null;
        mockMswServer.use(
          http.get("/weather", ({ request }) => {
            const url = new URL(request.url);
            capturedQ = url.searchParams.get("q");
            capturedAppid = url.searchParams.get("appid");
            return HttpResponse.json(mockWeather);
          })
        );

        await weatherService.getWeatherInformation("Argentina");

        expect(capturedQ).toBe("Argentina");
        expect(capturedAppid).toBe("YOUR_API_KEY");
      });

      it("should pass the city name as the q query param", async () => {
        let capturedQ: string | null = null;
        mockMswServer.use(
          http.get("/weather", ({ request }) => {
            capturedQ = new URL(request.url).searchParams.get("q");
            return HttpResponse.json(mockWeather);
          })
        );

        await weatherService.getWeatherInformation("New York");

        expect(capturedQ).toBe("New York");
      });
    });

    describe("when the request fails with an HTTP error", () => {
      it("should throw an error with the 404 status code", async () => {
        mockMswServer.use(
          http.get("/weather", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(
          weatherService.getWeatherInformation("UnknownCity")
        ).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with the 500 status code", async () => {
        mockMswServer.use(
          http.get("/weather", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(
          weatherService.getWeatherInformation("SomeCity")
        ).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with the 401 status code", async () => {
        mockMswServer.use(
          http.get("/weather", () => {
            return new HttpResponse(null, { status: 401 });
          })
        );

        await expect(
          weatherService.getWeatherInformation("SomeCity")
        ).rejects.toThrow("HTTP error! status: 401");
      });
    });

    describe("when the request fails with a network error", () => {
      it("should throw on network failure", async () => {
        mockMswServer.use(
          http.get("/weather", () => {
            return HttpResponse.error();
          })
        );

        await expect(
          weatherService.getWeatherInformation("SomeCity")
        ).rejects.toThrow();
      });
    });
  });
});
