export const getElements = () => ({
  searchButton: document.querySelector(
    ".card__header button"
  ) as HTMLButtonElement,
  searchInput: document.querySelector(
    ".card__header input"
  ) as HTMLInputElement,
  weatherImg: document.querySelector(
    ".card img"
  ) as HTMLImageElement,
  countryName: document.querySelector(
    ".card__header h2"
  ) as HTMLHeadingElement,
  temperature: document.querySelector(
    ".card__temp h1"
  ) as HTMLHeadingElement,
  temperatureDescription: document.querySelector(
    ".card__temp h3"
  ) as HTMLHeadingElement,
});
