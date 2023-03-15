import { Note as NoteModel } from '../models/note'
import { Card } from 'react-bootstrap'
import styles from '../styles/Note.module.css'
import { formatDate } from '../utils/formatDate'

interface NoteProps {
  note: NoteModel
  className?: String
}

function Note({ note, className }: NoteProps) {
  let createdUpdatedText: string
  note.createdAt >= note.updatedAt ? (createdUpdatedText = `Created: ${formatDate(note.createdAt)}`) : (createdUpdatedText = `Updated: ${formatDate(note.updatedAt)}`)

  return (
    <Card className={styles.noteCard}>
      <Card.Body className={`${styles.cardBody} ${className}`}>
        <Card.Title className={styles.cardTitle}>{note.title}</Card.Title>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  )
}

export default Note
