import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './models/note'

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/notes/', { method: 'GET' })
      const notes = await response.json()
      setNotes(notes)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className='App'>
      <h1>Hello world!</h1>
      {JSON.stringify(notes)}
      {/* {notes &&
        notes.map((note) => {
          return (
            <div>
              <h1>{note.title}</h1>
              <p>{note.text}</p>
            </div>
          )
        })} */}
    </div>
  )
}

export default App
