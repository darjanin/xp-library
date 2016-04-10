import React from 'react'
import databaseUtils from './pages/utils/DatabaseUtils'

export default class Navigation extends React.Component {
  loginPage(e) {
    e.preventDefault();
    this.props.changePageFn('login')
  }

  indexPage(e) {
    e.preventDefault();
    this.props.changePageFn('index')
  }

  handleLogout() {
    databaseUtils.logout()
  }

  render() {
    let loginOrLogOut
    if (this.props.loggedIn) {
      loginOrLogOut = <a className="button is-primary" onClick={this.handleLogout.bind(this)} href="#">Sign Out</a>
    } else {
      loginOrLogOut = <a className="button is-primary" onClick={this.loginPage.bind(this)} href="#">Log In</a>
    }

    return (
      <header className="header">
        <div className="container">
          <div className="header-left">
            <a className="header-tab" onClick={this.indexPage.bind(this)} href="#">Index</a>
          </div>

          <span className="header-toggle">
            <span></span>
          </span>

          <div className="header-right header-menu">
            <span className="header-item">
              {loginOrLogOut}
            </span>
          </div>
        </div>
      </header>
    )
  }
}
