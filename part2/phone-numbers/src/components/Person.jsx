/* eslint-disable react/prop-types */
export const Person = ({personsFilter, handleDelete}) => {
  return (
    <ul>
    {
     personsFilter.map(person => (
     <li key={`${person.name}:${person.id}`} > {person.name} {person.number} 
     <button onClick={()=> handleDelete(person?.id, person.name)} >delete</button>
     </li>

     ))
    }
  </ul>
  )
}
