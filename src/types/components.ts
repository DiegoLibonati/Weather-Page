export interface Component {
  cleanup?: () => void;
}

export interface CardStatsComponent extends Component, HTMLDivElement {}
