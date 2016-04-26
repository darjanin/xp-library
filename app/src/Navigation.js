import React from 'react'
import databaseUtils from './pages/utils/DatabaseUtils'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  handleLogout() {
    databaseUtils.logout()
  }

  changePage(page) {
    return function (e) {
      e.preventDefault();
      this.props.changePageFn(page)
      this.setState({active: page})
    }
  }

  render() {
    let loginOrLogOut
    let registration
    if (this.props.loggedIn) {
      loginOrLogOut = <a className="button is-primary" onClick={this.handleLogout.bind(this)} href="#">Sign Out</a>
    } else {
      loginOrLogOut = <a className="button is-primary" onClick={this.changePage('login').bind(this)} href="#">Log In</a>
      registration = <span className="header-item"> <a className="button is-primary" onClick={this.changePage('registration').bind(this)} href="#">Sign Up</a></span>
    }

    return (
        <header className="header">
          <div className="container">
            <div className="header-left">
              <a className="header-item" onClick={this.changePage('list').bind(this)} href="#">
                <img src="/logo.svg" alt="Logo" />
              </a>
              <a
                className={`header-tab ${this.state.active === 'list' ? 'is-active' : ''}`}
                onClick={this.changePage('list').bind(this)}
              >
                List of books
              </a>
              <a
                className={`header-tab ${this.state.active === 'add' ? 'is-active' : ''}`}
                onClick={this.changePage('add').bind(this)}
              >
                Add book
              </a>
            </div>

            <span className="header-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className="header-right header-menu">
              <span className="header-item">
                {loginOrLogOut}
              </span>
              {registration}
            </div>
          </div>
        </header>
    )
  }
}
