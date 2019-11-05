import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import './App.css'
import * as routes from '../../constants/routes'
import { ItemPost } from '../../pages/ItemPost'
import { ItemsPage } from '../../pages/ItemsPage'
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
        <Route path="/">
          <Redirect to="/items" />
        </Route>
        <Route path={routes.ITEMS} component={ItemsPage} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.SIGN_UP} component={Signup} />
        <PrivateRoute path={routes.ITEM_POST} component={ItemPost} />
      </Switch>
    </Router>
  )
}
