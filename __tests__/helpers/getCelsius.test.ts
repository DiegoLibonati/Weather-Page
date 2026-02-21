import { getCelsius } from "@/helpers/getCelsius";

describe("getCelsius", () => {
  it("should convert Kelvin to Celsius", () => {
    expect(getCelsius(273.15)).toBe(0);
  });

  it("should handle positive temperatures", () => {
    expect(getCelsius(293.15)).toBe(20);
  });

  it("should handle negative temperatures", () => {
    expect(getCelsius(253.15)).toBe(-20);
  });

  it("should floor the result", () => {
    expect(getCelsius(293.65)).toBe(20);
  });

  it("should handle freezing point", () => {
    expect(getCelsius(273.15)).toBe(0);
  });

  it("should handle boiling point", () => {
    expect(getCelsius(373.15)).toBe(100);
  });
});
