import React from 'react'
import databaseUtils from './utils/DatabaseUtils'
import validatorUtils from './utils/ValidatorUtil'

export default class Registration extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  onSubmit(e) {
    e.preventDefault()

    let user = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      passwordCheck: this.refs.passwordCheck.value
    }

    let messageUsername = validatorUtils.validateUsername(user.username)
    let messageEmail = validatorUtils.validateEmail(user.email)
    let messagePassword = validatorUtils.validatePassword(user.password, user.passwordCheck)

    console.log(user);
    console.log(messageUsername);
    console.log(messageEmail);
    console.log(messagePassword);

    let errorMessages = [];
    if(messageUsername) {
      errorMessages.push(messageUsername)
    }
    if(messageEmail) {
      errorMessages.push(messageEmail)
    }
    if(messagePassword) {
      errorMessages.push(messagePassword)
    }

    if(errorMessages) {
      this.setState({errors: errorMessages})
      return
    }

    databaseUtils.createUser(user, function (e) {
      console.log("reg", e)
    })
  }

  render() {
    let error = ''
    let length = this.state.errors.length
    let errorMessages = this.state.errors.map(function(error, i) {
      return length - 1 == i ? error: [error, <br/>]
    })
    if (errorMessages.length > 0){
      error = <div className="message is-danger"> <div className="message-body"> {errorMessages} </div> </div>
    }

    return (
      <div className="columns">
        <form className="column is-6 is-offset-3" onSubmit={this.onSubmit.bind(this)}>
          <div className="hero-content">
            <h1 className="title">
              Sign Up
            </h1>
          </div>
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
          {error}
          <button className="button is-primary" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}
