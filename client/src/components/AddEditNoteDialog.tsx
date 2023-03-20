import { Form, Modal, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note as NoteModel } from '../models/note'
import { InputNote } from '../network/note_API'
import * as NotesAPI from '../network/note_API'
import TextInputField from './forms/TextInputField'

interface AddEditNoteDialogProps {
  noteToEdit?: NoteModel
  onDismiss: () => void
  onNoteSaved: (note: NoteModel) => void
}

function AddEditNoteDialog({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputNote>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  })

  async function onSubmit(input: InputNote) {
    try {
      let noteResponse: NoteModel
      noteToEdit ? (noteResponse = await NotesAPI.updateNote(input, noteToEdit._id)) : (noteResponse = await NotesAPI.createNote(input))
      onNoteSaved(noteResponse)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField type='text' placeholder='Enter title' name='title' label='Title' register={register} registerOptions={{ required: 'required' }} error={errors.title} />
          <TextInputField type='text' placeholder='Enter text' name='text' label='Text' register={register} as='textarea' rows={5} error={errors.text} />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button form='addEditNoteForm' type='submit' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog
