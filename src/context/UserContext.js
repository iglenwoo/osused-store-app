import React from 'react'

const UserContext = React.createContext({})

export function UserChild() {
  return (
    <UserContext.Consumer>
      {user => (
        <div>
          {Object.keys(user).map(function(key) {
            return <li id={key}>{user[key]}</li>
          })}
        </div>
      )}
    </UserContext.Consumer>
  )
}

export class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.userInfo
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
