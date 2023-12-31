import { FC } from "react";

interface StatisticLineProps {
  title: string;
  value: number;
}

export const StatisticLine: FC<StatisticLineProps> = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{title === 'positive' ? value + '%' : value}</td>
    </tr>
  )
}
