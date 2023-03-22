import { Form, Modal, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { User as UserModel } from '../models/user'

import { LogInCredentials } from '../network/user_API'

import * as UsersAPI from '../network/user_API'
import TextInputField from './forms/TextInputField'
import styleUtils from '../styles/utils.module.css'

interface LogInModalProps {
  onDismiss: () => void
  onLogInSuccessful: (user: UserModel) => void
}

function LogInModal({ onDismiss, onLogInSuccessful }: LogInModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInCredentials>()

  async function onSubmit(credentials: LogInCredentials) {
    try {
      const loggedUser = await UsersAPI.logIn(credentials)
      onLogInSuccessful(loggedUser)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField type='text' placeholder='Enter username' name='username' label='Username' register={register} registerOptions={{ required: 'required' }} error={errors.username} />
          <TextInputField type='password' placeholder='Enter password' name='password' label='Password' register={register} registerOptions={{ required: 'required' }} error={errors.password} />
          <Button type='submit' disabled={isSubmitting} className={styleUtils.width100}>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LogInModal
