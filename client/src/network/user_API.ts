import { User } from '../models/user'
import { fetchData } from './utils/fetchData'

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
