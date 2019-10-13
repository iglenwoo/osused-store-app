import React, { useState } from 'react'
import { ButtonGroup, Button, Form } from 'react-bootstrap'
import './Signup.css'

export default function Signup(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <div className="Login">
      <form className="Form1">
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            size="lg"
            autoFocus
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
      </form>
      <form className="Form2">
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            size="lg"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
      </form>
      <Button
        variant="primary"
        size="lg"
        block
        disabled={!validateForm()}
        type="submit"
        onSubmit={handleSubmit}
      >
        Submit
      </Button>
    </div>
  )
}
