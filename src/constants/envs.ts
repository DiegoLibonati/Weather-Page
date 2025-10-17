import { Envs } from "@src/entities/constants";

const envs: Envs = {
  API_KEY: import.meta.env.VITE_API_KEY || "YOUR API KEY",
  API_URL: import.meta.env.VITE_API_URL || "YOUR API URL",
};

export default envs;
