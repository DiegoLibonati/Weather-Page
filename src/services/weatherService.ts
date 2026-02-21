import type { WeatherCountry } from "@/types/app";

import envs from "@/constants/envs";

export const weatherService = {
  getWeatherInformation: async (country: string): Promise<WeatherCountry> => {
    const response = await fetch(
      `/weather?q=${country}&appid=${envs.API_KEY}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const weatherInformation: WeatherCountry =
      (await response.json()) as WeatherCountry;

    return weatherInformation;
  },
};
