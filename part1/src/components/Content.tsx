import React from "react";

type Lesson = {
  title: string;
  exercises: number; // Change the type to number since 'exercises' is a number
};

interface ContentProps {
  lessonsAndExercises: Lesson[];
}

export const Content: React.FC<ContentProps> = ({ lessonsAndExercises }) => {

  return (
    <>
      {lessonsAndExercises.map((lesson: Lesson, index: number) => (
        <p key={index}>{lesson.title} {lesson.exercises}</p>
      ))}
    </>
  );
};
