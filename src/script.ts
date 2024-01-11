import { WeatherCountry } from "./entities/entities";

const sectionContainerImg = document.querySelector(".section_container img") as HTMLImageElement;
const sectionContainerSearchCountryName = document.querySelector(".section_container_search h2") as HTMLHeadingElement;
const sectionContainerSearchInput = document.querySelector(".section_container_search input") as HTMLInputElement;
const sectionContainerSearchBtn = document.querySelector(".section_container_search button") as HTMLButtonElement;
const sectionContainerTemp = document.querySelector(".section_container_temp h1") as HTMLHeadingElement;
const sectionContainerTempType = document.querySelector(".section_container_temp h3") as HTMLHeadingElement;

const API_KEY = "YOUR_API_KEY"


const getApiWeatherInfo = async (country: string): Promise<WeatherCountry> => {

    const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`);

    const result: WeatherCountry = await request.json();

    return result;
    
}

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

sectionContainerSearchBtn.addEventListener("click", searchTemp);