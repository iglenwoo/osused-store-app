import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import './App.css'
import { ItemPost } from '../../pages/ItemPost'
import { ItemList } from '../../pages/ItemList'

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
      <Switch>
        <Route path="/ItemList" component={ItemList} />
        <PrivateRoute path="/ItemPost" authed={authed} component={ItemPost} />
        <Route path="/">
          <Redirect to="/ItemList" />
        </Route>
      </Switch>
    </Router>
  )
}
