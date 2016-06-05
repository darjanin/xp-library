import React from 'react'
import databaseUtils from './utils/DatabaseUtils'
import {validateMaxLength, validateMinLength, validateAlphaNum, validateEmail, validateEqual} from '../ValidationUtils'

export default class Registration extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const {username, email, password, passwordCheck} = this.refs
    const user = {
      username: username.value,
      email: email.value,
      password: password.value,
      passwordCheck: passwordCheck.value
    }

    const errors = [
      ...validateMaxLength(user.username, 15, 'user name'),
      ...validateMinLength(user.username, 3, 'user name'),
      ...validateAlphaNum(user.username, 'user name'),
      ...validateEmail(user.email),
      ...validateMinLength(user.password, 6, 'password'),
      ...validateAlphaNum(user.password, 'password'),
      ...validateEqual(user.password, 'password', user.passwordCheck, 'password again')
    ]

    if(errors.length > 0) {
      this.setState({errors: errors})
    } else {
      databaseUtils.createUser(user, function (e) {})
    }
  }

  render() {
    return (
      <div className="columns">
        <form className="column is-6 is-offset-3" onSubmit={this.onSubmit.bind(this)}>
          <h1 className="title">
            Sign Up
          </h1>
          <div className="control">
            <input className="input" type="text" ref="username" placeholder="Username" required/>
          </div>
          <div className="control">
            <input className="input" type="text" ref="email" placeholder="E-mail" required/>
          </div>
          <div className="control">
            <input className="input" type="password" ref="password" placeholder="Password" required/>
          </div>
          <div className="control">
            <input className="input" type="password" ref="passwordCheck" placeholder="Password again" required/>
          </div>

          {this.state.errors.length > 0 &&
            <div className="message is-danger">
              <ul className="message-body">
                  {this.state.errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
          }

          <button className="button is-primary" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}
