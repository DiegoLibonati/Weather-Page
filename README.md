# Weather Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that we can search the current weather of cities and countries, through a free internet API will show different information such as the city or country, a weather icon, the degrees and how is the weather.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Libraries used

#### Dependencies

```
"@types/jest": "^29.5.14"
```

#### devDependencies

```
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"jest": "^29.7.0"
"msw": "^2.6.5"
"ts-jest": "^29.2.5"
"typescript": "^5.2.2"
"vite": "^5.0.8"
"jest-fixed-jsdom": "^0.0.9"
"jest-environment-jsdom": "^29.7.0"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Weather-Page`](https://www.diegolibonati.com.ar/#/project/Weather-Page)

## Video

https://user-images.githubusercontent.com/99032604/199374571-9b1fa392-28e1-4dea-bdfe-64065644b203.mp4

## Testing

1. Join to the correct path of the clone
2. Execute: `yarn install`
3. Execute: `yarn test`

## Documentation

We obtain all the containers we are going to use:

```
export const searchButton = document.querySelector(
  ".section_container_search button"
) as HTMLButtonElement;
export const searchInput = document.querySelector(
  ".section_container_search input"
) as HTMLInputElement;

export const weatherImg = document.querySelector(
  ".section_container img"
) as HTMLImageElement;
export const countryName = document.querySelector(
  ".section_container_search h2"
) as HTMLHeadingElement;
export const temperature = document.querySelector(
  ".section_container_temp h1"
) as HTMLHeadingElement;
export const temperatureDescription = document.querySelector(
  ".section_container_temp h3"
) as HTMLHeadingElement;
```

The `getWeatherInformation()` function is in charge of bringing all the information about a country or city through an API call:

```
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
```

The `searchTemp()` function is in charge of executing the previous function to get the information from the API about the city or country entered in the input and also to render the information in the components:

```
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
```
