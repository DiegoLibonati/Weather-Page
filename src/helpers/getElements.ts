export const getElements = () => ({
  searchButton: document.querySelector(
    ".card__header-btn-search"
  ) as HTMLButtonElement,
  searchInput: document.querySelector(
    ".card__header-input"
  ) as HTMLInputElement,
  weatherImg: document.querySelector(
    ".card__img"
  ) as HTMLImageElement,
  countryName: document.querySelector(
    ".card__header-title"
  ) as HTMLHeadingElement,
  temperature: document.querySelector(
    ".card__stats-temperature"
  ) as HTMLHeadingElement,
  temperatureDescription: document.querySelector(
    ".card__stats-temperature-description"
  ) as HTMLHeadingElement,
});
