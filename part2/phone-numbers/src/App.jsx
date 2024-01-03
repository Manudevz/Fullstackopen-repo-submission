import { useEffect, useState } from 'react'
import { Filter, Person, PersonForm } from './components'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Anthony Hellas', number: 1562-1256 },
    { name: 'emilio Hellas', number: 1562-886 },
    { name: 'enmanuel', number: 1562-886 },
    { name: 'javier', number: 1562-886 },


  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch] = useState('')
  const [personsFilter, setPersonsFilter] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearch(searchString);

    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(searchString)
    );
    setPersonsFilter(filteredPersons);
  }
  const handleNameSubmit = (e) => {
    e.preventDefault();
    const flagIncludes = persons.some((person) => person.name === newName);

    if (!flagIncludes) {
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        setPersons((prevPersons) => [...prevPersons, newPerson]);
        setPersonsFilter((prevPersons) => [...prevPersons, newPerson]); 
        setNewName('');
        setNewNumber('');
        alert(`${newName} added to phonebook`);
        return;
    }

    alert(`${newName} is already added to phonebook`);
  };

  useEffect(() => {

    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
      setPersonsFilter(response.data)
    })
   
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} search={search}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleNameSubmit={handleNameSubmit} newName={newName} newNumber={newNumber}/>
      <br />
      <h2>Numbers</h2>
      <Person personsFilter={personsFilter}/>
    </div>
  )
}

export default App