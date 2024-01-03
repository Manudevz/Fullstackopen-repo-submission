/* eslint-disable react/prop-types */

export const Person = ({personsFilter}) => {
  return (
    <ul>
    {
     personsFilter.map(person => (<li key={person.name}> {person.name} {person.number}</li>))
    }
  </ul>
  )
}
