const sectionContainerImg = document.querySelector(".section_container img");
const sectionContainerSearchCountryName = document.querySelector(".section_container_search h2");
const sectionContainerSearchInput = document.querySelector(".section_container_search input");
const sectionContainerSearchBtn = document.querySelector(".section_container_search button");
const sectionContainerTemp = document.querySelector(".section_container_temp h1");
const sectionContainerTempType = document.querySelector(".section_container_temp h3");


const getApiWeatherInfo = async (country) => {

    let petition = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=3265874a2c77ae4a04bb96236a642d2f`);

    let result = await petition.json();

    return result;
    
}

const searchTemp = async () => {

    const sectionContainerSearchInputValue = sectionContainerSearchInput.value;

    const countryTemp = await getApiWeatherInfo(sectionContainerSearchInputValue);

    sectionContainerImg.setAttribute("src", `https://openweathermap.org/img/wn/${countryTemp.weather[0].icon}@2x.png`);
    sectionContainerSearchCountryName.innerHTML = `${countryTemp.name.toUpperCase()}`;
    sectionContainerTemp.innerHTML = `${Math.floor(countryTemp.main.temp - 273.15)}°`;
    sectionContainerTempType.innerHTML = `${countryTemp.weather[0].description.charAt(0).toUpperCase() + countryTemp.weather[0].description.toLowerCase().slice(1)}`;

}

sectionContainerSearchBtn.addEventListener("click", searchTemp);