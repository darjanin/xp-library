import React from 'react'
import databaseUtils from './pages/utils/DatabaseUtils'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  handleLogout() {

  }

  render() {
    const {changePageFn, active, loggedIn} = this.props

    // let loginOrLogOut
    // let registration
    // if (this.props.loggedIn) {
    //   loginOrLogOut =
    // } else {
    //   loginOrLogOut = <button className="button is-primary" onClick={changePage('login')} href="#">Log In</button>
    //   registration =
    // }

    const HeaderTab = ({children, page}) => (
      <a
        className={`header-tab ${active === page ? 'is-active' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          changePageFn(page)
        }}
      >
        {children}
      </a>
    )

    return (
        <header className="header">
          <div className="container">
            <div className="header-left">
              <div
                className="header-item"
                onClick={() => changePageFn('list')}
              >
                <img src="/logo.svg" alt="Logo" key="logo-image" style={{cursor: 'pointer'}}/>
              </div>

              <HeaderTab key="list" page="list">List of books</HeaderTab>

              {this.props.loggedIn && <HeaderTab key="add" page="add">Add new book</HeaderTab>}
            </div>

            <div className="header-right">
              <div className="header-item">
                <button
                  className="button is-success"
                  onClick={(e) => {
                    e.preventDefault()
                    loggedIn ? databaseUtils.logout() : changePageFn('login')
                  }}
                >
                  {loggedIn ? 'Sign Out' : 'Log In'}
                </button>
              </div>

              {!loggedIn &&
                <div className="header-item">
                  <button
                    className="button is-info"
                    onClick={(e) => {
                      e.preventDefault()
                      changePageFn('registration')
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              }
            </div>
          </div>
        </header>
    )
  }
}
