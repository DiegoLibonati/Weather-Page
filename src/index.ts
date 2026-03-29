import "@/index.css";
import WeatherPage from "@/pages/WeatherPage/WeatherPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const weatherPage = WeatherPage();
  app.appendChild(weatherPage);
};

document.addEventListener("DOMContentLoaded", onInit);
