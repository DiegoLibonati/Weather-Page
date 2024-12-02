import { getElements } from "./getElements";

import fs from "fs";
import path from "path";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

beforeEach(() => {
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];
  document.body.innerHTML = body;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const {
    countryName,
    searchButton,
    searchInput,
    temperature,
    temperatureDescription,
    weatherImg,
  } = getElements();

  expect(countryName).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(temperature).toBeInTheDocument();
  expect(temperatureDescription).toBeInTheDocument();
  expect(weatherImg).toBeInTheDocument();
});
