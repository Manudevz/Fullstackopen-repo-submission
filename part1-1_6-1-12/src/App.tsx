import { useState } from 'react'
import { Button } from './components/Button'
import { Title } from './components/Title'
import { Statistics } from './components/Statistics'
import './App.css'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(prev => prev + 1)
  }
  const handleNeutral = () => {
    setNeutral(prev => prev + 1)
  }
  const handleBad = () => {
    setBad(prev => prev + 1)
  }

  return (
    <div>
      <Title title='give feedback' />
      <Button handleClick={handleGood} title='good' />
      <Button handleClick={handleNeutral} title='neutral' />
      <Button handleClick={handleBad} title='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App