export interface Lesson {
  title: string;
  exercises: number; 
};

export interface ContentProps {
  lessonsAndExercises: Lesson[];
}