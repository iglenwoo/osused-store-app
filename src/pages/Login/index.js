import React, { useState } from 'react'
import logo from '../../logo.svg'
import { useHistory } from 'react-router'
import { Redirect, BrowserRouter as Router, Switch } from 'react-router-dom'
//import { , Route, Link } from 'react-router-dom'
import Signup from '../Signup'
import { ButtonGroup, Button, Form } from 'react-bootstrap'
import './Login.css'

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  function signupClick() {
    history.push('/Signup')
  }

  function LoginClick() {
    history.push('/ItemPost')
  }

  return (
    <div className="Login">
      <img src={logo} className="App-logo" alt="logo" />

      <form>
        <Form.Row>
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
        </Form.Row>
        <ButtonGroup onSubmit={handleSubmit}>
          <Button
            variant="primary"
            size="lg"
            block
            disabled={!validateForm()}
            onClick={LoginClick}
            type="submit"
          >
            Login
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="primary" size="lg" block onClick={signupClick}>
            Signup
          </Button>
        </ButtonGroup>
      </form>
    </div>
  )
}

//<ButtonGroup>
//          <Button controlId="signup-buttom" block bsSize="large" type="submit">
//           Sign up
//            <BrowserRouter>
//              <Switch>
//                <Route exact path="../Signup" component={Signup} />
//              </Switch>
//            </BrowserRouter>
//          </Button>
//        </ButtonGroup>
