import { getElements } from "@src/helpers/getElements";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
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
  });
});
