import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import './App.css'
import * as routes from '../../constants/routes'
import { ItemPost } from '../../pages/ItemPost'
import { Items } from '../../pages/Items'
import { Login } from '../../pages/Login'
import { SignUp } from '../../pages/SignUp'
import { ButtonAppBar } from '../ButtonAppBar'
import { useUserContext } from '../../context/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useUserContext()

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuth !== null ? (
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
        <Route path={routes.ITEMS} component={Items} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.SIGN_UP} component={SignUp} />
        <PrivateRoute path={routes.ITEM_POST} component={ItemPost} />
        <Route path={routes.HOME}>
          <Redirect to={routes.ITEMS} />
        </Route>
      </Switch>
    </Router>
  )
}
