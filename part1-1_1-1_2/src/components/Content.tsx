import React, { FC } from "react";
import { ContentProps, Lesson } from "./types";

export const Content: FC<ContentProps> = ({ lessonsAndExercises }) => {

  return (
    <>
      {lessonsAndExercises.map((lesson: Lesson, index: number) => (
        <p key={index}>{lesson.title} {lesson.exercises}</p>
      ))}
    </>
  );
};
