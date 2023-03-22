import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { User as UserModel } from '../models/user'
import NavBarLoggedInView from './NavBarLoggedInView'
import NavBarLoggedOutView from './NavBarLoggedOutView'

interface NavBarProps {
  loggedInUser: UserModel | null
  onSignUpClicked: () => void
  onLogInClicked: () => void
  onLogOutSuccessful: () => void
}

function NavBar({ loggedInUser, onSignUpClicked, onLogInClicked, onLogOutSuccessful }: NavBarProps) {
  return (
    <Navbar bg='primary' variant='dark' expand='sm' sticky='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          NOTEPAD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navnar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav>
            <Nav.Link></Nav.Link>
          </Nav>
          <Nav className='ms-auto'>{loggedInUser ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccessful={onLogOutSuccessful} /> : <NavBarLoggedOutView onSignUpClicked={onSignUpClicked} onLogInClicked={onLogInClicked} />}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
