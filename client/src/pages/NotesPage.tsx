import { Container } from 'react-bootstrap'
import NotesPageLoggedInView from '../components/NotesPageLoggedInView'
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView'
import { User as UserModel } from '../models/user'
import styles from '../styles/NotesPage.module.css'

interface NotesPageProps {
  loggedInUser: UserModel | null
}

function NotesPage({ loggedInUser }: NotesPageProps) {
  //   const [loggedInUser, setLoggedInUser] = useState<UserModel | null>(null)

  //   const getLoggedInUser = async () => {
  //     try {
  //       const user = await UsersAPI.fetchLoggedInUser()
  //       setLoggedInUser(user)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   useEffect(() => {
  //     getLoggedInUser()
  //   }, [])
  return (
    <Container className={styles.notesPage}>
      <>{loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}</>
    </Container>
  )
}

export default NotesPage
