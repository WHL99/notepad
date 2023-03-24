import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { ConflictError } from '../errors/http_errors'
import { User as UserModel } from '../models/user'
import * as UsersAPI from '../network/user_API'
import { SignUpCredentials } from '../network/user_API'
import styleUtils from '../styles/utils.module.css'
import TextInputField from './forms/TextInputField'

interface SignUpModalProps {
  onDismiss: () => void
  onSignUpSuccessful: (user: UserModel) => void
}

function SignUpModal({ onDismiss, onSignUpSuccessful }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>()

  const [errorText, setErrorText] = useState<string | null>(null)

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UsersAPI.signUp(credentials)
      onSignUpSuccessful(newUser)
    } catch (error) {
      error instanceof ConflictError ? setErrorText(error.message) : alert(error)
      console.error(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant='danger'>{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField type='text' placeholder='Enter username' name='username' label='Username' register={register} registerOptions={{ required: 'required' }} error={errors.username} />
          <TextInputField type='email' placeholder='Enter email' name='email' label='Email' register={register} registerOptions={{ required: 'required' }} error={errors.email} />
          <TextInputField type='password' placeholder='Enter password' name='password' label='Password' register={register} registerOptions={{ required: 'required' }} error={errors.password} />
          <Button type='submit' disabled={isSubmitting} className={styleUtils.width100}>
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
