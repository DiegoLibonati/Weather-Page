import "@/index.css";
import ZephyrPage from "@/pages/ZephyrPage/ZephyrPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const zephyrPage = ZephyrPage();
  app.appendChild(zephyrPage);
};

document.addEventListener("DOMContentLoaded", onInit);
