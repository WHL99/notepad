import { Note } from '../models/note'
import { User } from '../models/user'

async function fetchData(input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init)
  if (response.ok) return response
  else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    throw Error(errorMessage)
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData('/api/users/', { method: 'GET' })
  return response.json()
}

export interface SignUpCredentials {
  username: string
  email: string
  password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export interface LogInCredentials {
  username: string
  password: string
}

export async function logIn(credentials: LogInCredentials): Promise<User> {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export async function logOut() {
  await fetchData('/api/users/logout', { method: 'POST' })
}

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
  noteID: Note['_id'],
): Promise<Note> {
  const response = await fetchData('/api/notes/' + noteID, {
    method: 'PATCH',
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
