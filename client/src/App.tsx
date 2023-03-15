import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  const getNotes = async () => {
    try {
      const response = await fetch('/api/notes/', { method: 'GET' })
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
    <Container>
      <Row xs={1} md={2} xl={4} className='g-4'>
        {/* 直接全部的data */}
        {/* {JSON.stringify(notes)} */}

        {/* loop data */}
        {notes &&
          notes.map((note) => {
            return (
              <Col>
                <Note note={note} key={note._id} className={styles.note} />
              </Col>
            )
          })}
      </Row>
    </Container>
  )
}

export default App
