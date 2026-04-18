import { getCapitalizeWord } from "@/helpers/getCapitalizeWord";

describe("getCapitalizeWord", () => {
  describe("with normal strings", () => {
    it("should capitalize the first letter and lowercase the rest", () => {
      expect(getCapitalizeWord("hello")).toBe("Hello");
    });

    it("should handle all uppercase input", () => {
      expect(getCapitalizeWord("HELLO")).toBe("Hello");
    });

    it("should handle all lowercase input", () => {
      expect(getCapitalizeWord("world")).toBe("World");
    });

    it("should handle mixed case input", () => {
      expect(getCapitalizeWord("hElLo WoRlD")).toBe("Hello world");
    });
  });

  describe("with a single character", () => {
    it("should return the character uppercased", () => {
      expect(getCapitalizeWord("a")).toBe("A");
    });

    it("should return the character unchanged when already uppercase", () => {
      expect(getCapitalizeWord("A")).toBe("A");
    });
  });

  describe("with an empty string", () => {
    it("should return an empty string", () => {
      expect(getCapitalizeWord("")).toBe("");
    });
  });

  describe("with strings containing spaces", () => {
    it("should capitalize only the first character and lowercase the rest", () => {
      expect(getCapitalizeWord("clear sky")).toBe("Clear sky");
    });

    it("should lowercase characters after a space", () => {
      expect(getCapitalizeWord("CLEAR SKY")).toBe("Clear sky");
    });
  });
});
