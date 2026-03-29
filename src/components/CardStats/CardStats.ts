import type { CardStatsProps } from "@/types/props";
import type { CardStatsComponent } from "@/types/components";

import "@/components/CardStats/CardStats.css";

const CardStats = ({
  temperature,
  description,
  icon,
}: CardStatsProps): CardStatsComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "card-stats";

  divRoot.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description} weather icon"
            class="card-stats__img"
        />
        <h1 class="card-stats__temperature">${temperature}°</h1>
        <h3 class="card-stats__description">${description}</h3>
    `;

  return divRoot;
};

export default CardStats;
