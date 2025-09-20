import { Config } from "@src/entities/entities";

export const CONFIG: Config = {
  API_KEY: import.meta.env.VITE_API_KEY || "YOUR API KEY",
  API_URL: import.meta.env.VITE_API_URL || "YOUR API URL",
};
