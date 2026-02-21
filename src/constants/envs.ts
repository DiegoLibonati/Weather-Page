import type { Envs } from "@/types/constants";

const envs: Envs = {
  API_KEY: (import.meta.env.VITE_API_KEY ?? "YOUR API KEY") as string,
  API_URL: (import.meta.env.VITE_API_URL ?? "YOUR API URL") as string,
};

export default envs;
