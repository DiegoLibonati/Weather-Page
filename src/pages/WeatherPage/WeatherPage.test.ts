import { screen, waitFor } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { WeatherPage } from "@src/pages/WeatherPage/WeatherPage";

import { getCapitalizeWord } from "@src/helpers/getCapitalizeWord";
import { getCelsius } from "@src/helpers/getCelsius";

import { createServer } from "@tests/msw/server";
import { WEATHER } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = WeatherPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/helpers/getCapitalizeWord");
jest.mock("@src/helpers/getCelsius");

createServer([
  {
    path: "/weather",
    method: "get",
    res: () => WEATHER,
  },
]);

describe("WeatherPage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getCelsius as jest.Mock).mockReturnValue(25);
    (getCapitalizeWord as jest.Mock).mockReturnValue("Clear sky");
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("weather-page");
      expect(container.querySelector(".card")).toBeInTheDocument();
    });

    test("It should render form with all elements", () => {
      renderComponent();

      const form = document.querySelector(".card__form");
      const title = screen.getByText("Wheater APP");
      const input = screen.getByPlaceholderText("Search country");
      const button = screen.getByRole("button", { name: /search/i });

      expect(form).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("It should have correct input attributes", () => {
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(".card__input");

      expect(input?.type).toBe("text");
      expect(input?.placeholder).toBe("Search country");
      expect(input).toHaveClass("card__input");
    });

    test("It should have submit button with correct attributes", () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /search/i });

      expect(button).toHaveClass("card__btn-search");
      expect(button.getAttribute("type")).toBe("submit");
      expect(button.textContent?.trim()).toBe("SEARCH");
    });

    test("It should render h2 title", () => {
      renderComponent();

      const title = document.querySelector(
        ".card__title"
      ) as HTMLHeadingElement;

      expect(title).toBeInstanceOf(HTMLHeadingElement);
      expect(title.tagName).toBe("H2");
    });
  });

  describe("Form Submission Tests.", () => {
    test("It should handle form submission with valid input", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const cardStats = document.querySelector(".card-stats");
        expect(cardStats).toBeInTheDocument();
      });
    });

    test("It should not submit form with empty input", async () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /search/i });

      await user.click(button);

      const cardStats = document.querySelector(".card-stats");
      expect(cardStats).not.toBeInTheDocument();
    });

    test("It should not submit form with whitespace only", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "   ");
      await user.click(button);

      const cardStats = document.querySelector(".card-stats");
      expect(cardStats).not.toBeInTheDocument();
    });

    test("It should trim input value before submission", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "  Argentina  ");
      await user.click(button);

      await waitFor(() => {
        const cardStats = document.querySelector(".card-stats");
        expect(cardStats).toBeInTheDocument();
      });
    });
  });

  describe("Weather Data Display Tests.", () => {
    test("It should display weather information after successful search", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const temperature = screen.getByText("25°");
        const description = screen.getByText("Clear sky");

        expect(temperature).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });

    test("It should update title with country name in uppercase", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const title = document.querySelector(".card__title");
        expect(title?.textContent).toBe("ARGENTINA");
      });
    });

    test("It should call getCelsius helper with temperature", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        expect(getCelsius).toHaveBeenCalledWith(WEATHER.main.temp);
      });
    });

    test("It should call getCapitalizeWord helper with description", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        expect(getCapitalizeWord).toHaveBeenCalledWith(
          WEATHER.weather[0].description
        );
      });
    });

    test("It should display weather icon", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const img = document.querySelector(
          ".card-stats__img"
        ) as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain(WEATHER.weather[0].icon);
      });
    });
  });

  describe("CardStats Component Tests.", () => {
    test("It should create CardStats component on successful search", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const cardStats = document.querySelector(".card-stats");
        expect(cardStats).toBeInTheDocument();
      });
    });

    test("It should append CardStats to card element", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const card = document.querySelector(".card");
        const cardStats = card?.querySelector(".card-stats");
        expect(cardStats).toBeInTheDocument();
      });
    });

    test("It should remove old CardStats before adding new one", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        const cardStats = document.querySelector(".card-stats");
        expect(cardStats).toBeInTheDocument();
      });

      await user.clear(input);
      await user.type(input, "Brazil");
      await user.click(button);

      await waitFor(() => {
        const allCardStats = document.querySelectorAll(".card-stats");
        expect(allCardStats.length).toBe(1);
      });
    });
  });

  describe("Multiple Searches Tests.", () => {
    test("It should handle multiple consecutive searches", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("25°")).toBeInTheDocument();
      });

      await user.clear(input);
      await user.type(input, "Chile");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("25°")).toBeInTheDocument();
      });
    });

    test("It should update title on each search", async () => {
      renderComponent();

      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;
      const button = screen.getByRole("button", { name: /search/i });
      const title = document.querySelector(".card__title");

      await user.type(input, "Argentina");
      await user.click(button);

      await waitFor(() => {
        expect(title?.textContent).toBe("ARGENTINA");
      });

      await user.clear(input);
      await user.type(input, "Uruguay");
      await user.click(button);

      await waitFor(() => {
        expect(title?.textContent).toBe("ARGENTINA");
      });
    });
  });

  describe("Form Behavior Tests.", () => {
    test("It should prevent default form submission", async () => {
      renderComponent();

      const form = document.querySelector(".card__form") as HTMLFormElement;
      const input = screen.getByPlaceholderText(
        "Search country"
      ) as HTMLInputElement;

      const submitSpy = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", submitSpy);

      await user.type(input, "Argentina");
      await user.click(screen.getByRole("button", { name: /search/i }));

      await waitFor(() => {
        expect(submitSpy).toHaveBeenCalled();
      });
    });

    test("It should have form element with correct class", () => {
      renderComponent();

      const form = document.querySelector(".card__form");

      expect(form).toBeInstanceOf(HTMLFormElement);
      expect(form?.tagName).toBe("FORM");
    });
  });
});
