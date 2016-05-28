import React from 'react'
import databaseUtils from './utils/DatabaseUtils'
import {userRequired} from '../ValidationUtils'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  onSubmit(e) {
    e.preventDefault()

    let user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }

    let errorsMessages = userRequired(user)

    let self = this

    function onError(dbMessage) {
      if (dbMessage) {
        self.setState({errors: ["Email or password are incorrect"]})
      }
    }

    if (errorsMessages.length === 0) {
      databaseUtils.loginWithPassword(user, onError)
    } else {
      this.setState({errors: errorsMessages})
    }
  }

  render() {
    return (
      <div className="columns">
        <form className="column is-6 is-offset-3" onSubmit={this.onSubmit.bind(this)}>
          <div className="hero-content">
            <h1 className="title">
              Log In
            </h1>
          </div>
          <div className="control">
            <input className="input" type="text" ref="email" placeholder="E-mail"/>
          </div>
          <div className="control">
            <input className="input" type="password" ref="password" placeholder="Password"/>
          </div>
          {this.state.errors.length > 0 &&
            <div className="message is-danger">
              <div className="message-body">
                <ul>
                  {this.state.errors.map((error) => <li key={Math.random()}>{error}</li>)}
                </ul>
              </div>
            </div>
          }
          <button className="button is-primary" type="submit">Log In</button>
        </form>
      </div>
    )
  }
}
