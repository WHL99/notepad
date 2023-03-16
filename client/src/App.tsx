import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'

import * as NotesAPI from './network/note_API'
import AddEditNoteDialog from './components/AddEditNoteDialog'
import { TiPlus } from 'react-icons/ti'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  const getNotes = async () => {
    try {
      const notes = await NotesAPI.fetchNotes()
      setNotes(notes)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (note: NoteModel) => {
    try {
      await NotesAPI.deleteNote(note._id)
      setNotes(notes.filter((existedNote) => existedNote._id !== note._id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <Container>
      <Button style={{ display: 'flex' }} className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
        <TiPlus />
        Add your note
      </Button>
      <Row xs={1} md={2} xl={4} className='g-4'>
        {notes &&
          notes.map((note) => {
            return (
              <Col key={note._id}>
                <Note note={note} className={styles.note} onDeleteNoteClicked={handleDelete} onNoteClicked={setNoteToEdit} />
              </Col>
            )
          })}
      </Row>
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(notes.map((existingNote) => (existingNote._id === updatedNote?._id ? updatedNote : existingNote)))
            setNoteToEdit(null)
          }}
        />
      )}
    </Container>
  )
}

export default App
