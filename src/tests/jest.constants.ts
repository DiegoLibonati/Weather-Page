import fs from "fs";
import path from "path";

import { WeatherCountry } from "../entities/entities";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

export const OFFICIAL_BODY = INITIAL_HTML.match(
  /<body[^>]*>([\s\S]*?)<\/body>/i
)![1];

export const WEATHER: WeatherCountry = {
  coord: { lon: -64, lat: -34 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  base: "stations",
  main: {
    temp: 298.98,
    feels_like: 298.09,
    temp_min: 298.98,
    temp_max: 298.98,
    pressure: 1015,
    humidity: 18,
    sea_level: 1015,
    grnd_level: 993,
  },
  visibility: 10000,
  wind: { speed: 4.83, deg: 107, gust: 5.41 },
  clouds: { all: 6 },
  dt: 1731964134,
  sys: { country: "AR", sunrise: 1731920531, sunset: 1731970840 },
  timezone: -10800,
  id: 3865483,
  name: "Argentina",
  cod: 200,
};
