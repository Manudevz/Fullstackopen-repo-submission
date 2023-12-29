import React from "react"

type Lesson = {
  title: string;
  exercises: number;
};
export const Total = ({ exercisesTotal }) => {
  const total = exercisesTotal.reduce((acc: number, element: Lesson) => {
    return element.exercises + acc
  }, 0)
  return (
    <p>Number of exercises {total}</p>


  )
}
