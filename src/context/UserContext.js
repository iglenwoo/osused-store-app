import React, { useState, useContext } from 'react'

const localhost = 'http://localhost:4000'
const UserContext = React.createContext({})

function logoutProcess(email, password) {
  return false
}

function loginProcess(email, password) {
  return fetch(localhost + '/users/login', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(response => {
      if (response.status !== 200) {
        alert(response.statusText)
        return null
      } else {
        alert('Login success!!')
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
