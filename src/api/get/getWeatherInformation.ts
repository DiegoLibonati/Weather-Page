import { WeatherCountry } from "@src/entities/app";

import envs from "@src/constants/envs";

export const getWeatherInformation = async (
  country: string
): Promise<WeatherCountry> => {
  try {
    const response = await fetch(
      `/weather?q=${country}&appid=${envs.API_KEY}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching weather.");
    }

    return response.json();
  } catch (e) {
    throw new Error(`Error fetching weather: ${e}.`);
  }
};
