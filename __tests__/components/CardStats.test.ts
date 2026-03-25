import type { CardStatsProps } from "@/types/props";
import type { CardStatsComponent } from "@/types/components";

import { CardStats } from "@/components/CardStats/CardStats";

const renderComponent = (props: CardStatsProps): CardStatsComponent => {
  const container = CardStats(props);
  document.body.appendChild(container);
  return container;
};

describe("CardStats Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: CardStatsProps = {
    temperature: 20,
    description: "Clear sky",
    icon: "01d",
  };

  it("should render card with correct structure", () => {
    renderComponent(defaultProps);

    const card = document.querySelector<HTMLDivElement>(".card-stats");
    expect(card).toBeInTheDocument();
  });

  it("should render weather icon", () => {
    renderComponent(defaultProps);

    const img = document.querySelector<HTMLImageElement>(".card-stats__img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@2x.png"
    );
    expect(img).toHaveAttribute("alt", "Clear sky weather icon");
  });

  it("should render temperature with degree symbol", () => {
    renderComponent(defaultProps);

    const temperature = document.querySelector<HTMLHeadingElement>(
      ".card-stats__temperature"
    );
    expect(temperature).toBeInTheDocument();
    expect(temperature?.textContent).toBe("20°");
  });

  it("should render weather description", () => {
    renderComponent(defaultProps);

    const description = document.querySelector<HTMLHeadingElement>(
      ".card-stats__description"
    );
    expect(description).toBeInTheDocument();
    expect(description?.textContent).toBe("Clear sky");
  });

  it("should render with different weather conditions", () => {
    const rainyProps: CardStatsProps = {
      temperature: 15,
      description: "Light rain",
      icon: "10d",
    };

    renderComponent(rainyProps);

    const temperature = document.querySelector<HTMLHeadingElement>(
      ".card-stats__temperature"
    );
    const description = document.querySelector<HTMLHeadingElement>(
      ".card-stats__description"
    );
    const img = document.querySelector<HTMLImageElement>(".card-stats__img");

    expect(temperature?.textContent).toBe("15°");
    expect(description?.textContent).toBe("Light rain");
    expect(img).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/10d@2x.png"
    );
  });

  it("should render negative temperatures", () => {
    const coldProps: CardStatsProps = {
      temperature: -5,
      description: "Snow",
      icon: "13d",
    };

    renderComponent(coldProps);

    const temperature = document.querySelector<HTMLHeadingElement>(
      ".card-stats__temperature"
    );
    expect(temperature?.textContent).toBe("-5°");
  });
});
