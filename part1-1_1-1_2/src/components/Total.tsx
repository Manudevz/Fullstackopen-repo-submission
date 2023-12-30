import React, { FC } from "react"
import { ContentProps, Lesson } from "./types"


export const Total: FC<ContentProps> = ({ lessonsAndExercises }) => {
  const total = lessonsAndExercises.reduce((acc: number, element: Lesson) => {
    return element.exercises + acc
  }, 0)
  return (
    <p>Number of exercises {total}</p>


  )
}
