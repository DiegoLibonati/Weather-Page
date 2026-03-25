import type { Page } from "@/types/pages";

import { CardStats } from "@/components/CardStats/CardStats";

import { weatherService } from "@/services/weatherService";

import { getCapitalizeWord } from "@/helpers/getCapitalizeWord";
import { getCelsius } from "@/helpers/getCelsius";

import "@/pages/WeatherPage/WeatherPage.css";

export const WeatherPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "weather-page";

  main.innerHTML = `
    <section class="card">
        <form class="card__form">
            <h2 class="card__title">Weather APP</h2>
            <input type="text" placeholder="Search country" aria-label="Country or city name" class="card__input" />
            <button type="submit" aria-label="Search weather" class="card__btn-search">
                SEARCH
            </button>
        </form>
    </section>
  `;

  const form = main.querySelector<HTMLFormElement>(".card__form");

  const onSubmitForm = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    const input = main.querySelector<HTMLInputElement>(".card__input");

    const value = input?.value.trim();

    if (!value) return;

    const weather = await weatherService.getWeatherInformation(value);

    const cardStats = main.querySelector<HTMLDivElement>(".card-stats");

    if (cardStats) cardStats.remove();

    const newCardStats = CardStats({
      temperature: getCelsius(weather.main.temp),
      description: getCapitalizeWord(weather.weather[0].description ?? ""),
      icon: weather.weather[0].icon ?? "",
    });

    const card = main.querySelector<HTMLElement>(".card");
    card?.append(newCardStats);

    const title = main.querySelector<HTMLHeadingElement>(".card__title");

    if (title) {
      title.textContent = weather.name.toUpperCase();
    }
  };

  const handleFormSubmit = (e: SubmitEvent): void => {
    void onSubmitForm(e);
  };

  form?.addEventListener("submit", handleFormSubmit);

  main.cleanup = (): void => {
    form?.removeEventListener("submit", handleFormSubmit);
  };

  return main;
};
