import React, { useState, useContext, useEffect } from 'react'
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

//TODO: need to check is token expired or not
function useProvideAuth() {
  const key = 'token'
  // token include user email
  const [auth, setAuth] = useState({ Uid: '', token: '', isAuth: false })

  useEffect(() => {
    async function fetchToken() {
      const res = await fetch(API_BASE_URL + '/chkToken', {
        method: 'GET',
        headers: { authorization: localStorage.getItem(key) },
      })
      if (res.status !== 200) return console.log(res.statusText)

      const data = await res.json()
      setAuth({
        Uid: data.userId,
        token: localStorage.getItem(key),
        isAuth: true,
      })
    }

    fetchToken().catch(e => console.error(e))
  }, [])

  const login = (email, password) => {
    return loginProcess(email, password).then(respData => {
      if (respData == null) return false
      setAuth({ Uid: respData.user._id, token: respData.token, isAuth: true })
      localStorage.setItem(key, respData.token)
      return true
    })
  }

  const logout = (email, password) => {
    setAuth({ Uid: '', token: '', isAuth: false })
    localStorage.removeItem(key)
    return logoutProcess(email, password)
  }

  return {
    auth,
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
