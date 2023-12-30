import React, { FC } from "react"
import { Content, Header, Total } from "./components"
import { allData } from "./utils"

const App: FC = () => {
  const { courseTitle, lessonsAndExercises } = allData;

  return (

    <div>
      <Header courseTitle={courseTitle} />
      <Content lessonsAndExercises={lessonsAndExercises} />
      <Total lessonsAndExercises={lessonsAndExercises} />
    </div>
  )
}

export default App