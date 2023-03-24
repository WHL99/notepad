import { useEffect, useState } from 'react'
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap'
import { TiPlus } from 'react-icons/ti'
import { Note as NoteModel } from '../models/note'
import * as NotesAPI from '../network/note_API'
import styles from '../styles/NotesPage.module.css'
import styleUtils from '../styles/utils.module.css'
import AddEditNoteDialog from './AddEditNoteDialog'
import Note from './Note'

function NotesPageLoggedInView() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)
  const [notesLoading, setNotesLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

  const getNotes = async () => {
    try {
      setShowNotesLoadingError(false)
      setNotesLoading(true)
      const notes = await NotesAPI.fetchNotes()
      setNotes(notes)
    } catch (error) {
      console.error(error)
      setShowNotesLoadingError(true)
    } finally {
      setNotesLoading(false)
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

  const notesGrid = (
    <Row xs={1} md={2} xl={4} className={`g-4 ${styles.notesGrid}`}>
      {notes &&
        notes.map((note) => {
          return (
            <Col key={note._id}>
              <Note note={note} className={styles.note} onDeleteNoteClicked={handleDelete} onNoteClicked={setNoteToEdit} />
            </Col>
          )
        })}
    </Row>
  )
  return (
    <>
      <Button style={{ display: 'flex' }} className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
        <TiPlus />
        Add your note
      </Button>

      {notesLoading && (
        <>
          <Spinner animation='border' variant='primary' />
          <p>Notes are loading...</p>
        </>
      )}
      {showNotesLoadingError && <Alert variant='danger'>Something went wrong...</Alert>}
      {!notesLoading && !showNotesLoadingError && <>{notes.length > 0 ? notesGrid : <p>You have no notes yet.</p>}</>}

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
    </>
  )
}

export default NotesPageLoggedInView
