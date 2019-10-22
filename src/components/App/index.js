import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import './App.css'
import { ItemPost } from '../../pages/ItemPost'
import { ItemListPage } from '../../pages/ItemListPage'
import { Login } from '../../pages/Login'
import { Signup } from '../../pages/Signup'
import { ButtonAppBar } from '../ButtonAppBar'

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
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
  // TODO: authed needs to change
  const authed = true

  return (
    <Router>
      <ButtonAppBar />
      <Switch>
        <Route path="/ItemList">
          <ItemListPage />
        </Route>
        <PrivateRoute path="/ItemPost" authed={authed} component={ItemPost} />
        <PrivateRoute path="/Login" authed={authed}>
          <Login />
        </PrivateRoute>
        <PrivateRoute path="/Signup" authed={authed}>
          <Signup />
        </PrivateRoute>
        <Route path="/">
          <Redirect to="/ItemList" />
        </Route>
      </Switch>
    </Router>
  )
}
