import React, { useState, useContext } from 'react'
import { API_BASE_URL } from '../constants/routes'

const UserContext = React.createContext({})

function logoutProcess(email, password) {
  //TODO: logout
  return false
}

function loginProcess(email, password) {
  return fetch(API_BASE_URL + '/users/login', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(response => {
      if (response.status !== 200) {
        alert(response.statusText)
        return null
      } else {
        return response.json()
      }
    })
    .catch(function(err) {
      console.log(err)
    })
}

function useProvideAuth() {
  const [userInfo, setUserInfo] = useState(null)
  const [token, setToken] = useState('')

  const login = (email, password) => {
    return loginProcess(email, password).then(respData => {
      if (respData == null) return false
      setUserInfo(respData.user)
      setToken(respData.token)
      return true
    })
  }

  const logout = (email, password) => {
    setUserInfo(null)
    setToken('')
    return logoutProcess(email, password)
  }

  return {
    userInfo,
    token,
    login,
    logout,
  }
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const auth = useProvideAuth()
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>
}
