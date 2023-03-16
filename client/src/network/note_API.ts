import { Note } from '../models/note'

async function fetchData(input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init)
  if (response.ok) return response
  else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    throw Error(errorMessage)
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData('/api/notes/', { method: 'GET' })
  return response.json()
}

export interface InputNote {
  title: string
  text?: string
}

export async function createNote(note: InputNote): Promise<Note[]> {
  const response = await fetchData('/api/notes/', {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function deleteNote(noteID: Note['_id']) {
  await fetchData('/api/notes/' + noteID, {
    method: 'DELETE',
  })
}
