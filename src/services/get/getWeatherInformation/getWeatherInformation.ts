import { WeatherCountry } from "../../../entities/entities";

import { CONFIG } from "../../../constants/config";

export const getWeatherInformation = async (
  country: string
): Promise<WeatherCountry> => {
  const request = await fetch(
    `/weather?q=${country}&appid=${CONFIG.API_KEY}`
  );

  const result: WeatherCountry = await request.json();

  return result;
};
