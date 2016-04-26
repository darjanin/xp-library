import React from 'react'
import databaseUtils from './utils/DatabaseUtils'

export default class Login extends React.Component {
  onSubmit(e) {
    e.preventDefault()

    let user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }

    databaseUtils.loginWithPassword(user)
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
          <button className="button is-primary" type="submit">Log In</button>
        </form>
      </div>
    )
  }
}
