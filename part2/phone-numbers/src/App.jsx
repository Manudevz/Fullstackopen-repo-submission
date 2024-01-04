import { useEffect, useState } from 'react'
import { Filter, Person, PersonForm, Notification } from './components'
import numberServices from './services/numberServices'

const App = () => {
 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch] = useState('')
  const [personsFilter, setPersonsFilter] = useState([])
  const [customMessage, setcustomMessage] = useState(null)


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearch(searchString);

    const filteredPersons = personsFilter.filter(person =>
      person.name.toLowerCase().includes(searchString)
    );
    setPersonsFilter(filteredPersons);
  }
  const handleNameSubmit = (e) => {
    e.preventDefault();
    // verifica que la persona ya este guardada en el arreglo persons.
    const flagIncludes = personsFilter.some((person) => person.name === newName);

    if (!flagIncludes) {
      //  en caso de no estarlo, agrega a la nueva persona junto a su nro
        const newPerson = {
            name: newName,
            number: newNumber,
            id: Date.now().toString(36) + Math.random().toString(36).slice(2)
        };

        setPersonsFilter((prevPersons) => [...prevPersons, newPerson]); 
        numberServices.create(newPerson)
        setcustomMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setcustomMessage(null)
        }, 3000)
        setNewName('');
        setNewNumber('');
        
    }else{
      // en caso de estarlo, manda un mensaje de que la persona ya esta agregada
      if(confirm(`${newName} is already added to phonebook, replace the old one with a new one ?`)){
        const person = personsFilter.find(person => person.name === newName)
        const updatePerson = {...person, number: newNumber}
        numberServices.update(person.id, updatePerson).then(updatePerson  => {
          setPersonsFilter(personsFilter.map(person => person.name !== newName ? person : updatePerson ))
    
        })
        setcustomMessage(
          `${newName} updated`
        )
        setTimeout(() => {
          setcustomMessage(null)
        }, 3000)
      }

    }
  };

  const handleDelete = (id, name) => {
    const isDeleted = window.confirm(`Delete ${name} ?`)
    if(isDeleted){
      const namePersisted = name
      if(id){
          numberServices.remove(id).then(() => {
            setPersonsFilter((prevPersons) => prevPersons.filter(persons => {
              setcustomMessage(
                `${namePersisted} deleted`
              )
              setTimeout(() => {
                setcustomMessage(null)
              }, 4000)
              return persons.id !== id
            }));
          }).catch(() => console.log('mamalo'))
      
      }

    
    }else{
      alert('ok, amigo')
    }

  }

  useEffect(() => {

    numberServices.getAll()
    .then(data => 
    { 
      setPersonsFilter(data)
    })
  }, [])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={customMessage} />
      <Filter handleSearchChange={handleSearchChange} search={search}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleNameSubmit={handleNameSubmit} newName={newName} newNumber={newNumber}/>
      <br />
      <h2>Numbers</h2>
      <Person personsFilter={personsFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App