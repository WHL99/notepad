import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'

import * as NotesAPI from './network/note_API'
import AddNoteDialog from './components/AddNoteDialog'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)

  const getNotes = async () => {
    try {
      const notes = await NotesAPI.fetchNotes()
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
      <Button style={{ display: 'block' }} className={`mb-4 ${styleUtils.blockCenter}`} onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} xl={4} className='g-4'>
        {notes &&
          notes.map((note) => {
            return (
              <Col key={note._id}>
                <Note note={note} className={styles.note} />
              </Col>
            )
          })}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      )}
    </Container>
  )
}

export default App
