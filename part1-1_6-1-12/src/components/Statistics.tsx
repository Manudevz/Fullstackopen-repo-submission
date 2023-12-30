import { FC } from 'react'

interface StatisticsProps {
  good: number;
  neutral: number;
  bad: number;
}

export const Statistics: FC<StatisticsProps> = ({ good, neutral, bad }) => {
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
