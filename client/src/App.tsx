import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styles from '../src/styles/App.module.css'
import LogInModal from './components/LogInModal'
import NavBar from './components/NavBar'
import SignUpModal from './components/SignUpModal'
import { User as UserModel } from './models/user'
import * as UsersAPI from './network/user_API'
import NotesPage from './pages/NotesPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLogInModal, setShowLogInModal] = useState(false)

  const getLoggedInUser = async () => {
    try {
      const user = await UsersAPI.fetchLoggedInUser()
      setLoggedInUser(user)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getLoggedInUser()
  }, [])

  return (
    <BrowserRouter>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => {
          setShowSignUpModal(true)
        }}
        onLogInClicked={() => {
          setShowLogInModal(true)
        }}
        onLogOutSuccessful={() => {
          setLoggedInUser(null)
        }}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route path='/' element={<NotesPage loggedInUser={loggedInUser} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false)
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user)
            setShowSignUpModal(false)
          }}
        />
      )}

      {showLogInModal && (
        <LogInModal
          onDismiss={() => {
            setShowLogInModal(false)
          }}
          onLogInSuccessful={(user) => {
            setLoggedInUser(user)
            setShowLogInModal(false)
          }}
        />
      )}
    </BrowserRouter>
  )
}

export default App
