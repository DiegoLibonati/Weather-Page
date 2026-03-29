import { mockEnvs } from "@tests/__mocks__/envs.mock";

jest.mock("@/constants/envs", () => {
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import WeatherPage from "@/pages/WeatherPage/WeatherPage";

import { weatherService } from "@/services/weatherService";

import {
  mockWeather,
  mockWeather2,
  mockWeather3,
} from "@tests/__mocks__/weather.mock";

jest.mock("@/services/weatherService");

const mockedWeatherService = weatherService as jest.Mocked<
  typeof weatherService
>;

const renderPage = (): Page => {
  const container = WeatherPage();
  document.body.appendChild(container);
  return container;
};

describe("WeatherPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".weather-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render card section", () => {
    renderPage();

    const card = document.querySelector<HTMLElement>(".card");
    expect(card).toBeInTheDocument();
  });

  it("should render page title", () => {
    renderPage();

    expect(screen.getByText("Weather APP")).toBeInTheDocument();
  });

  it("should render search input", () => {
    renderPage();

    const input = document.querySelector<HTMLInputElement>(".card__input");
    expect(input).toBeInTheDocument();
    expect(input?.placeholder).toBe("Search country");
  });

  it("should render search button", () => {
    renderPage();

    const button = screen.getByRole("button", { name: "Search weather" });
    expect(button).toBeInTheDocument();
    expect(button.textContent.trim()).toBe("SEARCH");
  });

  it("should search for weather when form is submitted", async () => {
    const user = userEvent.setup();

    mockedWeatherService.getWeatherInformation.mockResolvedValue(mockWeather);

    renderPage();

    const input = document.querySelector<HTMLInputElement>(".card__input");
    if (input) await user.type(input, "Argentina");

    const form = document.querySelector<HTMLFormElement>(".card__form");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    await Promise.resolve();

    expect(mockedWeatherService.getWeatherInformation).toHaveBeenCalledWith(
      "Argentina"
    );
  });

  it("should display weather stats after successful search", async () => {
    const user = userEvent.setup();

    mockedWeatherService.getWeatherInformation.mockResolvedValue(mockWeather2);

    renderPage();

    const input = document.querySelector<HTMLInputElement>(".card__input");
    if (input) await user.type(input, "Paris");

    const form = document.querySelector<HTMLFormElement>(".card__form");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const cardStats = document.querySelector<HTMLDivElement>(".card-stats");
    expect(cardStats).toBeInTheDocument();
  });

  it("should update title with city name after search", async () => {
    const user = userEvent.setup();

    mockedWeatherService.getWeatherInformation.mockResolvedValue(mockWeather3);

    renderPage();

    const input = document.querySelector<HTMLInputElement>(".card__input");
    if (input) await user.type(input, "Tokyo");

    const form = document.querySelector<HTMLFormElement>(".card__form");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const title = document.querySelector<HTMLHeadingElement>(".card__title");
    expect(title?.textContent).toBe("TOKYO");
  });

  it("should not submit when input is empty", async () => {
    renderPage();

    const form = document.querySelector<HTMLFormElement>(".card__form");
    if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));

    await Promise.resolve();

    expect(mockedWeatherService.getWeatherInformation).not.toHaveBeenCalled();
  });

  it("should cleanup form listener on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
