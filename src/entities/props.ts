interface DefaultProps {
  className?: string;
  children?: string;
}

export interface CardStatsProps extends DefaultProps {
  temperature: number;
  description: string;
  icon: string;
}
