/* eslint-disable react/prop-types */

export const Course = ({courses}) => {
  return (
    <>
    {
      courses?.map(course =>
        {
          const totalExercises = course.parts.reduce((acc, el)=> acc + el.exercises, 0)
          return (
            <div key={course.id}>
              <h2>{course.name}</h2>
              {
                course.parts.map(part => (
                  <p key={part.id}>{part.name} {part.exercises}</p>
                ))
              }
              <strong key={`total:${course.id}`}>total of {totalExercises} exercises</strong>
            </div>
          )
        }
       
      )
    }
    </>
  )
}
