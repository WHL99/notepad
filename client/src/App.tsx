import { Container } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'

import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'
import { User as UserModel } from './models/user'
import * as UsersAPI from './network/user_API'
import NotesPageLoggedInView from './components/NotesPageLoggedInView'
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView'
import SignUpModal from './components/SignUpModal'
import LogInModal from './components/LogInModal'

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
    <div>
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

      <Container className={styles.notesPage}>
        <>{loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}</>
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
    </div>
  )
}

export default App
