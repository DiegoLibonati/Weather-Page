import { getCelsius } from "./getCelsius";

describe("getCelsius.ts", () => {
  describe("General Tests.", () => {
    test("You should return the temperature in degrees Celsius.", () => {
      const temperature = 300;
      const temperatureExpected = Math.floor(300 - 273.15);

      const celcius = getCelsius(temperature);

      expect(celcius).toBe(temperatureExpected);
    });
  });
});
