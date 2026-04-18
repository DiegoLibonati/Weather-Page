import { getCelsius } from "@/helpers/getCelsius";

describe("getCelsius", () => {
  describe("with standard Kelvin values", () => {
    it("should convert 273.15 K to 0°C", () => {
      expect(getCelsius(273.15)).toBe(0);
    });

    it("should convert 298.98 K to 25°C", () => {
      expect(getCelsius(298.98)).toBe(25);
    });

    it("should convert 373.15 K to 100°C", () => {
      expect(getCelsius(373.15)).toBe(100);
    });
  });

  describe("with decimal results", () => {
    it("should floor the result when conversion yields decimals", () => {
      expect(getCelsius(300)).toBe(26);
    });

    it("should floor negative decimal results", () => {
      expect(getCelsius(250)).toBe(-24);
    });
  });

  describe("with zero Kelvin", () => {
    it("should convert 0 K to -274°C", () => {
      expect(getCelsius(0)).toBe(-274);
    });
  });

  describe("with values below 273.15 K", () => {
    it("should return negative Celsius values", () => {
      expect(getCelsius(253.15)).toBe(-20);
    });
  });
});
