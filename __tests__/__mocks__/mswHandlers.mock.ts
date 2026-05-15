import { http, HttpResponse } from "msw";

import { mockWeather } from "@tests/__mocks__/weather.mock";

export const mockMswHandlers = [
  http.get("/weather", () => {
    return HttpResponse.json(mockWeather);
  }),
];
