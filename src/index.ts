import { WeatherPage } from "@src/pages/WeatherPage/WeatherPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const weatherPage = WeatherPage();
  app.appendChild(weatherPage);
};

document.addEventListener("DOMContentLoaded", onInit);
