import { FC } from "react";

interface StatisticLineProps {
  title: string;
  value: number;
}

export const StatisticLine: FC<StatisticLineProps> = ({ title, value }) => {
  return (
    <><p>{title} {title === 'positive' ? value + '%' : value}</p></>
  )
}
