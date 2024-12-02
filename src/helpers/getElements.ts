export const getElements = () => ({
  searchButton: document.querySelector(
    ".section_container_search button"
  ) as HTMLButtonElement,
  searchInput: document.querySelector(
    ".section_container_search input"
  ) as HTMLInputElement,
  weatherImg: document.querySelector(
    ".section_container img"
  ) as HTMLImageElement,
  countryName: document.querySelector(
    ".section_container_search h2"
  ) as HTMLHeadingElement,
  temperature: document.querySelector(
    ".section_container_temp h1"
  ) as HTMLHeadingElement,
  temperatureDescription: document.querySelector(
    ".section_container_temp h3"
  ) as HTMLHeadingElement,
});
