import { screen } from "@testing-library/dom";

import { CardStats } from "@src/components/CardStats/CardStats";

import { CardStatsProps } from "@src/entities/props";

type RenderComponent = {
  container: HTMLElement;
  props: CardStatsProps;
};

const renderComponent = (props: CardStatsProps): RenderComponent => {
  const container = CardStats(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("CardStats.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: CardStatsProps = {
        temperature: 25,
        description: "clear sky",
        icon: "01d",
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("card-stats");
    });

    test("It should render all required elements", () => {
      const props: CardStatsProps = {
        temperature: 20,
        description: "cloudy",
        icon: "02d",
      };

      renderComponent(props);

      const img = screen.getByAltText("default img weather");
      const temperature = screen.getByText("20°");
      const description = screen.getByText("cloudy");

      expect(img).toBeInTheDocument();
      expect(temperature).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should have correct CSS classes", () => {
      const props: CardStatsProps = {
        temperature: 15,
        description: "rainy",
        icon: "10d",
      };

      renderComponent(props);

      const img = document.querySelector(".card-stats__img");
      const temperature = document.querySelector(".card-stats__temperature");
      const description = document.querySelector(".card-stats__description");

      expect(img).toBeInTheDocument();
      expect(temperature).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should display the correct temperature", () => {
      const props: CardStatsProps = {
        temperature: 30,
        description: "sunny",
        icon: "01d",
      };

      const { props: componentProps } = renderComponent(props);

      const temperature = screen.getByText("30°");

      expect(temperature).toBeInTheDocument();
      expect(temperature.textContent).toBe("30°");
    });

    test("It should display the correct description", () => {
      const props: CardStatsProps = {
        temperature: 18,
        description: "partly cloudy",
        icon: "03d",
      };

      const { props: componentProps } = renderComponent(props);

      const description = screen.getByText(componentProps.description);

      expect(description).toBeInTheDocument();
      expect(description.textContent).toBe("partly cloudy");
    });

    test("It should render image with correct src from icon prop", () => {
      const props: CardStatsProps = {
        temperature: 22,
        description: "clear",
        icon: "01d",
      };

      renderComponent(props);

      const img = screen.getByAltText(
        "default img weather"
      ) as HTMLImageElement;

      expect(img.src).toBe(
        `https://openweathermap.org/img/wn/${props.icon}@2x.png`
      );
    });

    test("It should render image with correct alt text", () => {
      const props: CardStatsProps = {
        temperature: 10,
        description: "snowy",
        icon: "13d",
      };

      renderComponent(props);

      const img = screen.getByAltText("default img weather");

      expect(img).toHaveAttribute("alt", "default img weather");
    });
  });

  describe("Different Weather Conditions Tests.", () => {
    test("It should render clear weather correctly", () => {
      const props: CardStatsProps = {
        temperature: 25,
        description: "clear sky",
        icon: "01d",
      };

      renderComponent(props);

      const temperature = screen.getByText("25°");
      const description = screen.getByText("clear sky");

      expect(temperature).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should render rainy weather correctly", () => {
      const props: CardStatsProps = {
        temperature: 16,
        description: "light rain",
        icon: "10d",
      };

      renderComponent(props);

      const temperature = screen.getByText("16°");
      const description = screen.getByText("light rain");

      expect(temperature).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should render snowy weather correctly", () => {
      const props: CardStatsProps = {
        temperature: -5,
        description: "snow",
        icon: "13d",
      };

      renderComponent(props);

      const temperature = screen.getByText("-5°");
      const description = screen.getByText("snow");

      expect(temperature).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should render cloudy weather correctly", () => {
      const props: CardStatsProps = {
        temperature: 20,
        description: "broken clouds",
        icon: "04d",
      };

      renderComponent(props);

      const temperature = screen.getByText("20°");
      const description = screen.getByText("broken clouds");

      expect(temperature).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("HTML Structure Tests.", () => {
    test("It should render h1 for temperature", () => {
      const props: CardStatsProps = {
        temperature: 23,
        description: "sunny",
        icon: "01d",
      };

      renderComponent(props);

      const temperature = document.querySelector(
        ".card-stats__temperature"
      ) as HTMLHeadingElement;

      expect(temperature).toBeInstanceOf(HTMLHeadingElement);
      expect(temperature.tagName).toBe("H1");
    });

    test("It should render h3 for description", () => {
      const props: CardStatsProps = {
        temperature: 19,
        description: "foggy",
        icon: "50d",
      };

      renderComponent(props);

      const description = document.querySelector(
        ".card-stats__description"
      ) as HTMLHeadingElement;

      expect(description).toBeInstanceOf(HTMLHeadingElement);
      expect(description.tagName).toBe("H3");
    });

    test("It should render img element", () => {
      const props: CardStatsProps = {
        temperature: 27,
        description: "hot",
        icon: "01d",
      };

      renderComponent(props);

      const img = document.querySelector(
        ".card-stats__img"
      ) as HTMLImageElement;

      expect(img).toBeInstanceOf(HTMLImageElement);
      expect(img.tagName).toBe("IMG");
    });
  });

  describe("Icon URL Tests.", () => {
    test("It should use correct OpenWeatherMap URL format", () => {
      const props: CardStatsProps = {
        temperature: 21,
        description: "mist",
        icon: "50d",
      };

      renderComponent(props);

      const img = document.querySelector(
        ".card-stats__img"
      ) as HTMLImageElement;

      expect(img.src).toContain("https://openweathermap.org/img/wn/");
      expect(img.src).toContain("@2x.png");
    });

    test("It should handle different icon codes", () => {
      const icons = ["01d", "02n", "10d", "13d", "50d"];

      icons.forEach((icon) => {
        document.body.innerHTML = "";

        const props: CardStatsProps = {
          temperature: 20,
          description: "test",
          icon: icon,
        };

        renderComponent(props);

        const img = document.querySelector(
          ".card-stats__img"
        ) as HTMLImageElement;

        expect(img.src).toBe(
          `https://openweathermap.org/img/wn/${icon}@2x.png`
        );
      });
    });

    test("It should handle night icons", () => {
      const props: CardStatsProps = {
        temperature: 12,
        description: "clear sky",
        icon: "01n",
      };

      renderComponent(props);

      const img = document.querySelector(
        ".card-stats__img"
      ) as HTMLImageElement;

      expect(img.src).toBe("https://openweathermap.org/img/wn/01n@2x.png");
    });
  });
});
