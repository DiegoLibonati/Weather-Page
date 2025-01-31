export const getElements = () => ({
  searchButton: document.querySelector(
    ".card__btn-search"
  ) as HTMLButtonElement,
  searchInput: document.querySelector(
    ".card__input"
  ) as HTMLInputElement,
  weatherImg: document.querySelector(
    ".card__img"
  ) as HTMLImageElement,
  countryName: document.querySelector(
    ".card__title"
  ) as HTMLHeadingElement,
  temperature: document.querySelector(
    ".card__temperature"
  ) as HTMLHeadingElement,
  temperatureDescription: document.querySelector(
    ".card__temperature-description"
  ) as HTMLHeadingElement,
});
