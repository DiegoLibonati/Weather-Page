import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import fs from "fs";
import path from "path";

import { getCelsius } from "./helpers/getCelsius";
import { getCapitalizeWord } from "./helpers/getCapitalizeWord";

import { createServer } from "./tests/msw/server";
import { WEATHER } from "./tests/constants/constants";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

createServer([
  {
    path: `/weather`,
    method: "get",
    res: ({ request }) => {
      const url = new URL(request.url);
      const country = url.searchParams.get("q");
      const apiKey = url.searchParams.get("appid");

      console.log(country, apiKey);

      return WEATHER;
    },
  },
]);

jest.mock("./constants/config.ts", () => ({
  get CONFIG() {
    return {
      API_KEY: process.env.VITE_API_KEY,
      API_URL: process.env.VITE_API_URL,
    };
  },
}));

beforeEach(() => {
  jest.resetModules();

  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];
  document.body.innerHTML = body;

  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render a title, the search input, the submit button and the main cloud image.", () => {
  const heading = screen.getByRole("heading", {
    name: /wheater app/i,
  });
  const input = screen.getByPlaceholderText(/search country/i);
  const searchButton = screen.getByRole("button", {
    name: /search/,
  });
  const defaultImage = screen.getByRole("img");
  expect(heading).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(defaultImage).toBeInTheDocument();
  expect(defaultImage).toHaveAttribute(
    "src",
    "https://openweathermap.org/img/wn/04n@2x.png"
  );
  expect(defaultImage).toHaveAttribute("alt", "default img weather");
});

test("When you click without entering an empty string, the search input must be cleared.", async () => {
  const input = screen.getByPlaceholderText(/search country/i);
  const searchButton = screen.getByRole("button", {
    name: /search/,
  });

  expect(input).toBeInTheDocument();
  expect(input).not.toHaveValue();
  expect(searchButton).toBeInTheDocument();

  await user.click(input);
  await user.keyboard("   ");

  expect(input).toHaveValue("   ");

  await user.click(searchButton);

  expect(input).not.toHaveValue();
});

test("It should display the forecast image, the country name, the temperature in degrees Celsius and the description of the temperature to search for given the name of a country when the search button is clicked.", async () => {
  const input = screen.getByPlaceholderText(/search country/i);
  const searchButton = screen.getByRole("button", {
    name: /search/,
  });

  const inputValue = "Argentina";

  expect(input).toBeInTheDocument();
  expect(input).not.toHaveValue();
  expect(searchButton).toBeInTheDocument();

  await user.click(input);
  await user.keyboard(inputValue);

  expect(input).toHaveValue(inputValue);

  await user.click(searchButton);

  expect(input).not.toHaveValue();

  const icon = WEATHER.weather[0].icon;
  const name = WEATHER.name.toUpperCase();
  const celsiusTemp = getCelsius(WEATHER.main.temp);
  const description = getCapitalizeWord(WEATHER.weather[0].description);

  const heading = screen.getByRole("heading", {
    name: name,
  });
  const img = screen.getByRole("img");
  const celsiusTempElement = screen.getByRole("heading", {
    name: new RegExp(`${celsiusTemp}°`),
  });
  const descriptionElement = screen.getByRole("heading", {
    name: description,
  });

  expect(heading).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  expect(img).toHaveAttribute("alt", "default img weather");
  expect(celsiusTempElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
