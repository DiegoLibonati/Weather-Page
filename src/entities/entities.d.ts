export type WeatherCountry = {
  weather: {
    icon: string;
    description: string;
  }[];
  name: string;
  main: {
    temp: number
  }
};
