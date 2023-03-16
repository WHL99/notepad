import { Note as NoteModel } from '../models/note'
import { Card } from 'react-bootstrap'
import styles from '../styles/Note.module.css'
import { formatDate } from '../utils/formatDate'
import { RiDeleteBinLine } from 'react-icons/ri'
import styleUtils from '../styles/utils.module.css'

interface NoteProps {
  note: NoteModel
  className?: String
  onDeleteNoteClicked: (note: NoteModel) => void
}

function Note({ note, className, onDeleteNoteClicked }: NoteProps) {
  let createdUpdatedText: string
  note.createdAt >= note.updatedAt ? (createdUpdatedText = `Created: ${formatDate(note.createdAt)}`) : (createdUpdatedText = `Updated: ${formatDate(note.updatedAt)}`)

  return (
    <Card className={styles.noteCard} style={{ backgroundColor: 'lightBlue' }}>
      <Card.Body className={`${styles.cardBody} ${className}`}>
        <Card.Title className={`${styles.cardTitle} ${styleUtils.flexCenter}`}>
          {note.title}
          <RiDeleteBinLine
            className='tect-muted ms-auto'
            onClick={(e) => {
              onDeleteNoteClicked(note)
              e.stopPropagation()
              // A method for event handlers that stops the event from bubbling up the event chain.
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  )
}

export default Note
