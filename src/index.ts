import { WeatherCountry } from "./entities/entities";

import {
  countryName,
  searchButton,
  searchInput,
  temperature,
  temperatureDescription,
  weatherImg,
} from "./constants/elements";
import { getWeatherInformation } from "./services/get/getWeatherInformation/getWeatherInformation";
import { getCelsius } from "./helpers/getCelsius";
import { getCapitalizeWord } from "./helpers/getCapitalizeWord";

const searchTemp = async (): Promise<void> => {
  const inputValue: string = searchInput.value;

  if (!inputValue.trim()) {
    searchInput.value = "";
    return;
  }

  const weatherCountry: WeatherCountry = await getWeatherInformation(
    inputValue
  );

  searchInput.value = "";

  const icon = weatherCountry.weather[0].icon;
  const name = weatherCountry.name.toUpperCase();
  const celsiusTemp = getCelsius(weatherCountry.main.temp);
  const description = getCapitalizeWord(weatherCountry.weather[0].description);

  weatherImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  countryName.innerHTML = name;
  temperature.innerHTML = `${celsiusTemp}°`;
  temperatureDescription.innerHTML = description;
};

const onInit = () => {
  // console.log("YOUR CONFIG FILE: ", CONFIG);

  searchButton.addEventListener("click", searchTemp);
};

document.addEventListener("DOMContentLoaded", onInit);
