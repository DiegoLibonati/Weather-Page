import { CardStatsProps } from "@src/entities/props";

import "@src/components/CardStats/CardStats.css";

export const CardStats = ({
  temperature,
  description,
  icon,
}: CardStatsProps) => {
  const divRoot = document.createElement("div");
  divRoot.className = "card-stats";

  divRoot.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="default img weather"
            class="card-stats__img"
        />
        <h1 class="card-stats__temperature">${`${temperature}°`}</h1>
        <h3 class="card-stats__description">${description}</h3>
    `;

  return divRoot;
};
