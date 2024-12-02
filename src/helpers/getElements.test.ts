import { getElements } from "./getElements";

const INITIAL_HTML: string = `
    <main>
      <section class="section_container">
        <div class="section_container_search">
          <h2>Wheater APP</h2>
          <input type="text" placeholder="Search country" />
          <button type="button" aria-label="search">SEARCH</button>
        </div>

        <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="default img weather"/>

        <div class="section_container_temp">
          <h1></h1>
          <h3></h3>
        </div>
      </section>
    </main>
`;

beforeEach(() => {
  const body = INITIAL_HTML;

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
