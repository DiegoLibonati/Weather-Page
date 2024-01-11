# Weather-Page

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

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/48`](https://www.diegolibonati.com.ar/#/project/48)

## Video

https://user-images.githubusercontent.com/99032604/199374571-9b1fa392-28e1-4dea-bdfe-64065644b203.mp4

## Documentation

We obtain all the containers we are going to use:

```
const sectionContainerImg = document.querySelector(".section_container img") as HTMLImageElement;
const sectionContainerSearchCountryName = document.querySelector(".section_container_search h2") as HTMLHeadingElement;
const sectionContainerSearchInput = document.querySelector(".section_container_search input") as HTMLInputElement;
const sectionContainerSearchBtn = document.querySelector(".section_container_search button") as HTMLButtonElement;
const sectionContainerTemp = document.querySelector(".section_container_temp h1") as HTMLHeadingElement;
const sectionContainerTempType = document.querySelector(".section_container_temp h3") as HTMLHeadingElement;

const API_KEY = "YOUR_API_KEY"
```

The `getApiWeatherInfo()` function is in charge of bringing all the information about a country or city through an API call:

```
const getApiWeatherInfo = async (country: string): Promise<WeatherCountry> => {

    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`);

    const result: WeatherCountry = await request.json();

    return result;
    
}
```

The `searchTemp()` function is in charge of executing the previous function to get the information from the API about the city or country entered in the input and also to render the information in the components:

```
const searchTemp = async (): Promise<void> => {

    const inputValue: string = sectionContainerSearchInput.value;

    if (!inputValue.trim()){
        return
    }

    const weatherCountry: WeatherCountry = await getApiWeatherInfo(inputValue);

    sectionContainerSearchInput.value = ""

    sectionContainerImg.setAttribute("src", `https://openweathermap.org/img/wn/${weatherCountry.weather[0].icon}@2x.png`);
    sectionContainerSearchCountryName.innerHTML = `${weatherCountry.name.toUpperCase()}`;
    sectionContainerTemp.innerHTML = `${Math.floor(weatherCountry.main.temp - 273.15)}°`;
    sectionContainerTempType.innerHTML = `${weatherCountry.weather[0].description.charAt(0).toUpperCase() + weatherCountry.weather[0].description.toLowerCase().slice(1)}`;

    return
}
```
