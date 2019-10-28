import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './components/App'
import { UserProvider } from './context/UserContext'

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
)
