import type { WeatherCountry } from "@/types/app";
import type { ResponseDirect } from "@/types/responses";

import envs from "@/constants/envs";

const weatherService = {
  getWeatherInformation: async (
    country: string
  ): Promise<ResponseDirect<WeatherCountry>> => {
    const response = await fetch(
      `/weather?q=${country}&appid=${envs.API_KEY}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseDirect<WeatherCountry>;
  },
};

export default weatherService;
