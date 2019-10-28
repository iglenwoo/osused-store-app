import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import './App.css'
import { ItemPost } from '../../pages/ItemPost'
import { ItemListPage } from '../../pages/ItemListPage'
import { Login } from '../../pages/Login'
import { Signup } from '../../pages/Signup'
import { ButtonAppBar } from '../ButtonAppBar'
import { useUserContext } from '../../context/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useUserContext()

  return (
    <Route
      {...rest}
      render={props =>
        userInfo !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export const App = () => {
  return (
    <Router>
      <ButtonAppBar />
      <Switch>
        <Route path="/ItemList">
          <ItemListPage />
        </Route>
        <PrivateRoute path="/ItemPost" component={ItemPost} />
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Signup">
          <Signup />
        </Route>
        <Route path="/">
          <Redirect to="/ItemList" />
        </Route>
      </Switch>
    </Router>
  )
}
