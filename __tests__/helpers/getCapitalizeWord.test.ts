import { getCapitalizeWord } from "@/helpers/getCapitalizeWord";

describe("getCapitalizeWord", () => {
  it("should capitalize first letter and lowercase rest", () => {
    expect(getCapitalizeWord("hello")).toBe("Hello");
  });

  it("should handle all uppercase words", () => {
    expect(getCapitalizeWord("HELLO")).toBe("Hello");
  });

  it("should handle all lowercase words", () => {
    expect(getCapitalizeWord("hello")).toBe("Hello");
  });

  it("should handle mixed case words", () => {
    expect(getCapitalizeWord("hELLo")).toBe("Hello");
  });

  it("should handle single character", () => {
    expect(getCapitalizeWord("a")).toBe("A");
  });

  it("should handle empty string", () => {
    expect(getCapitalizeWord("")).toBe("");
  });

  it("should handle words with spaces", () => {
    expect(getCapitalizeWord("clear sky")).toBe("Clear sky");
  });
});
