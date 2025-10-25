import { GetWeatherInformationResponse } from "@src/entities/responses";

import envs from "@src/constants/envs";

export const getWeatherInformation = async (
  country: string
): Promise<GetWeatherInformationResponse> => {
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

    const data: GetWeatherInformationResponse = await response.json();

    return data;
  } catch (e) {
    throw new Error(`Error fetching weather: ${e}.`);
  }
};
