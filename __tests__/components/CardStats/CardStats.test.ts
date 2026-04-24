import { screen } from "@testing-library/dom";

import type { CardStatsProps } from "@/types/props";
import type { CardStatsComponent } from "@/types/components";

import CardStats from "@/components/CardStats/CardStats";

const defaultProps: CardStatsProps = {
  temperature: 25,
  description: "Clear sky",
  icon: "01d",
};

const renderComponent = (
  props: Partial<CardStatsProps> = {}
): CardStatsComponent => {
  const element = CardStats({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("CardStats", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a div with class card-stats", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>(".card-stats")
      ).toBeInTheDocument();
    });

    it("should render the weather icon with the correct src", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://openweathermap.org/img/wn/01d@2x.png"
      );
    });

    it("should render the weather icon with the correct alt text", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        "Clear sky weather icon"
      );
    });

    it("should render the weather icon with the correct class", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveClass("card-stats__img");
    });

    it("should render the temperature with the degree symbol", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "25°"
      );
    });

    it("should render the temperature heading with the correct class", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
        "card-stats__temperature"
      );
    });

    it("should render the description", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Clear sky"
      );
    });

    it("should render the description heading with the correct class", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
        "card-stats__description"
      );
    });
  });

  describe("edge cases", () => {
    it("should render the correct temperature when given a different value", () => {
      renderComponent({ temperature: -10 });
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "-10°"
      );
    });

    it("should render the correct icon when given a different icon code", () => {
      renderComponent({ icon: "02n" });
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://openweathermap.org/img/wn/02n@2x.png"
      );
    });

    it("should update the alt text when the description changes", () => {
      renderComponent({ description: "Heavy rain", icon: "10d" });
      expect(screen.getByRole("img")).toHaveAttribute(
        "alt",
        "Heavy rain weather icon"
      );
    });

    it("should render the correct description when given a different value", () => {
      renderComponent({ description: "Heavy rain" });
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Heavy rain"
      );
    });

    it("should render zero degrees correctly", () => {
      renderComponent({ temperature: 0 });
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("0°");
    });
  });
});
