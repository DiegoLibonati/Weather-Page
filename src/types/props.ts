interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface CardStatsProps extends DefaultProps {
  temperature: number;
  description: string;
  icon: string;
}
