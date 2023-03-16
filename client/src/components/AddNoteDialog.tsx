import { Form, Modal, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../models/note'
import { InputNote } from '../network/note_API'
import * as NotesAPI from '../network/note_API'

interface AddNoteDialogProps {
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

function AddNoteDialog({ onDismiss, onNoteSaved }: AddNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputNote>()

  async function onSubmit(input: InputNote) {
    try {
      const response = await NotesAPI.createNote(input)
      onNoteSaved(response[0])
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton className='d-flex justify-content-center flex-column'>
        <Modal.Title>Add Note</Modal.Title>
        <Modal.Body>
          <Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' placeholder='Enter title' isInvalid={!!errors.title} {...register('title', { required: 'required' })} />
              <Form.Control.Feedback type='invalid'>{errors.title?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Text</Form.Label>
              <Form.Control type='text' placeholder='Enter text' {...register('text')} as='textarea' rows={5} />
              <Form.Text className='text-muted'>It's optional.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button form='addNoteForm' variant='primary' type='submit' disabled={isSubmitting}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  )
}

export default AddNoteDialog
