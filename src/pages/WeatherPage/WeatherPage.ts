import { CardStats } from "@src/components/CardStats/CardStats";

import { getWeatherInformation } from "@src/api/get/getWeatherInformation";

import { getCapitalizeWord } from "@src/helpers/getCapitalizeWord";
import { getCelsius } from "@src/helpers/getCelsius";

import "@src/pages/WeatherPage/WeatherPage.css";

const onSubmitForm = async (e: SubmitEvent) => {
  e.preventDefault();

  const input = document.querySelector<HTMLInputElement>(".card__input");

  const value = input?.value.trim();

  if (!value) return;

  const weather = await getWeatherInformation(value);

  const cardStats = document.querySelector<HTMLDivElement>(".card-stats");

  if (cardStats) cardStats.remove();

  const newCardStats = CardStats({
    temperature: getCelsius(weather!.main.temp),
    description: getCapitalizeWord(weather!.weather[0].description),
    icon: weather!.weather[0].icon,
  });

  const card = document.querySelector<HTMLElement>(".card");

  card?.append(newCardStats);

  const title = document.querySelector<HTMLHeadingElement>(".card__title");

  title!.textContent = weather.name.toUpperCase();
};

export const WeatherPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "weather-page";

  main.innerHTML = `
    <section class="card">
        <form class="card__form">
            <h2 class="card__title">Wheater APP</h2>
            <input type="text" placeholder="Search country" class="card__input" />
            <button type="submit" aria-label="search" class="card__btn-search">
                SEARCH
            </button>
        </form>
    </section>
  `;

  const form = main.querySelector<HTMLFormElement>(".card__form");

  form?.addEventListener("submit", (e) => onSubmitForm(e));

  return main;
};
