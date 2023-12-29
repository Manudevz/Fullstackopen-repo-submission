import { Content, Header, Total } from "./components"

const App = () => {
  const courseTitle = 'Half Stack application development'
  const lessonsAndExercises = [
    {
      title: 'Fundamentals of React',
      exercises: 10
    },
    {
      title: 'Using props to pass data',
      exercises: 7

    },
    {
      title: 'State of a component',
      exercises: 14

    }
  ]

  return (
  
    <div>
      <Header courseTitle={courseTitle} />
      <Content lessonsAndExercises={lessonsAndExercises} />
      <Total exercisesTotal={lessonsAndExercises} />
    </div>
  )
}

export default App