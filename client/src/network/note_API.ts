import { Note } from '../models/note'
import { fetchData } from './utils/fetchData'

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData('/api/notes/', { method: 'GET' })
  return response.json()
}

export interface InputNote {
  title: string
  text?: string
}

export async function createNote(note: InputNote): Promise<Note> {
  const response = await fetchData('/api/notes/', {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function updateNote(
  note: InputNote,
  noteId: Note['_id'],
): Promise<Note> {
  const response = await fetchData('/api/notes/' + noteId, {
    method: 'PATCH',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function deleteNote(noteId: Note['_id']) {
  await fetchData('/api/notes/' + noteId, {
    method: 'DELETE',
  })
}
