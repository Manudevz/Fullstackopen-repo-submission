import  { useState, useEffect } from 'react'
import Note from './components/Notes'
import noteService from './services/notes'
import { Notification } from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showImportant, setShowImportant] = useState(true)
  const [notesToShow, setNotesToShow] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

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
      console.log("🚀 ~ file: App.jsx:25 ~ toggleImportanceOf ~ error:", error)
      setErrorMessage(
        `Note: ${note.content}, was already removed from server`
      )
      setNotes(notes.filter(n => n.id !== id))
      setNotesToShow(notes.filter(n => n.id !== id))
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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
      <Notification message={errorMessage} />
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
      <Footer/>
    </div>
  )
}

export default App
