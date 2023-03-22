import { User as UserModel } from '../models/user'
import { Navbar, Button } from 'react-bootstrap'
import * as UsersAPI from '../network/user_API'

interface NavBarLoggedInViewProps {
  user: UserModel
  onLogOutSuccessful: () => void
}

function NavBarLoggedInView({ user, onLogOutSuccessful }: NavBarLoggedInViewProps) {
  async function logOut() {
    try {
      await UsersAPI.logOut()
      onLogOutSuccessful()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logOut}>Log Out</Button>
    </>
  )
}

export default NavBarLoggedInView
