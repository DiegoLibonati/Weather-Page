import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import ZephyrPage from "@/pages/ZephyrPage/ZephyrPage";

import { mockWeather, mockWeather2 } from "@tests/__mocks__/weather.mock";

jest.mock("@/constants/envs", () => {
  const mockData = jest.requireActual("@tests/__mocks__/envs.mock");
  const { mockEnvs } = mockData;
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => data,
  } as Response);
};

const renderPage = (): Page => {
  const element = ZephyrPage();
  document.body.appendChild(element);
  return element;
};

describe("ZephyrPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render the Zephyr title", () => {
      renderPage();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Zephyr"
      );
    });

    it("should render the country search input", () => {
      renderPage();
      expect(
        screen.getByRole("textbox", { name: "Country or city name" })
      ).toBeInTheDocument();
    });

    it("should render the search button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Search weather" })
      ).toBeInTheDocument();
    });

    it("should not render card stats on initial load", () => {
      renderPage();
      expect(
        document.querySelector<HTMLDivElement>(".card-stats")
      ).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    describe("when submitting with an empty input", () => {
      it("should not call fetch", async () => {
        global.fetch = jest.fn();
        renderPage();
        const user = userEvent.setup();
        await user.click(
          screen.getByRole("button", { name: "Search weather" })
        );
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    describe("when submitting with only whitespace", () => {
      it("should not call fetch", async () => {
        global.fetch = jest.fn();
        renderPage();
        const user = userEvent.setup();
        await user.type(
          screen.getByRole("textbox", { name: "Country or city name" }),
          "   "
        );
        await user.click(
          screen.getByRole("button", { name: "Search weather" })
        );
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    describe("when submitting a valid city name", () => {
      it("should render card stats after a successful search", async () => {
        mockFetchSuccess(mockWeather);
        renderPage();
        const user = userEvent.setup();
        await user.type(
          screen.getByRole("textbox", { name: "Country or city name" }),
          "Argentina"
        );
        await user.click(
          screen.getByRole("button", { name: "Search weather" })
        );
        await waitFor(() => {
          expect(
            document.querySelector<HTMLDivElement>(".card-stats")
          ).toBeInTheDocument();
        });
      });

      it("should update the title with the country name in uppercase", async () => {
        mockFetchSuccess(mockWeather);
        renderPage();
        const user = userEvent.setup();
        await user.type(
          screen.getByRole("textbox", { name: "Country or city name" }),
          "Argentina"
        );
        await user.click(
          screen.getByRole("button", { name: "Search weather" })
        );
        await waitFor(() => {
          expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
            "ARGENTINA"
          );
        });
      });

      it("should replace the previous card stats on a second search", async () => {
        mockFetchSuccess(mockWeather);
        renderPage();
        const user = userEvent.setup();
        const input = screen.getByRole("textbox", {
          name: "Country or city name",
        });

        await user.type(input, "Argentina");
        await user.click(
          screen.getByRole("button", { name: "Search weather" })
        );
        await waitFor(() => {
          expect(
            document.querySelector<HTMLDivElement>(".card-stats")
          ).toBeInTheDocument();
        });

        mockFetchSuccess(mockWeather2);
        await user.clear(input);
        await user.type(input, "Paris");
        await user.click(
          screen.getByRole("button", { name: "Search weather" })
        );
        await waitFor(() => {
          expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
            "PARIS"
          );
        });
        expect(
          document.querySelectorAll<HTMLDivElement>(".card-stats")
        ).toHaveLength(1);
      });
    });
  });

  describe("cleanup", () => {
    it("should remove the submit event listener when cleanup is called", async () => {
      mockFetchSuccess(mockWeather);
      const page = renderPage();
      page.cleanup?.();
      const user = userEvent.setup();
      await user.type(
        screen.getByRole("textbox", { name: "Country or city name" }),
        "Argentina"
      );
      await user.click(screen.getByRole("button", { name: "Search weather" }));
      expect(
        document.querySelector<HTMLDivElement>(".card-stats")
      ).not.toBeInTheDocument();
    });
  });
});
