import { FC } from 'react'
import { StatisticLine } from './StatisticLine';

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

export const Statistics: FC<StatisticsProps> = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);
  const positive = total === 0 ? 0 : (good / (good + neutral + bad)) * 100;
  return (
    <>
      <h2>statistics</h2>
      {
        total === 0 ? 'No feedback given' :
          <table>
            <tbody>
              <StatisticLine title='good' value={good} />
              <StatisticLine title='neutral' value={neutral} />
              <StatisticLine title='bad' value={bad} />
              <StatisticLine title='all' value={total} />
              <StatisticLine title='average' value={average} />
              <StatisticLine title='positive' value={positive} />
            </tbody>
          </table>
      }
    </>
  )
}
