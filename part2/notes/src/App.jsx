import  { useState, useEffect } from 'react'
import Note from './components/Notes'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showImportant, setShowImportant] = useState(true)
  const [notesToShow, setNotesToShow] = useState([])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log("🚀 ~ file: App.jsx:15 ~ toggleImportanceOf ~ changedNote:", changedNote)
  
    noteService
    .update(id, changedNote)
    .then(returnedNote  => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote ))
      setNotesToShow(notes.map(note => note.id !== id ? note : returnedNote ))

    }).catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server. ${error.message}`
      )
      setNotes(notes.filter(n => n.id !== id))
      setNotesToShow(notes.filter(n => n.id !== id))

    })
    
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
    .create(noteObject)
    .then(returnedNote  => {
      setNotes(notes.concat(returnedNote ))
      setNewNote('')
    })
    setNotesToShow(notes.concat(noteObject))
    setShowImportant(true)
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  useEffect(() => {
    noteService
      .getAll()
      .then(initialValues => {
        setNotes(initialValues)
        setNotesToShow(initialValues)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  const handleShowshowImportant = () => {
    setShowImportant((prev) => !prev)
    if (showImportant) {
      setNotesToShow(notes.filter((note) => note.important))
    } else {
      setNotesToShow(notes)
    }
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={handleShowshowImportant}>
          show {showImportant ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id}  toggleImportance={() => toggleImportanceOf(note.id)} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
