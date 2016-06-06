import React from 'react'
import databaseUtils from './pages/utils/DatabaseUtils'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null,
    }
  }

  componentWillMount() {
    let userId = this.props.userId
    if (userId) {
      this.setUserInfo(userId);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.userId !== this.props.userId){
      this.setUserInfo(this.props.userId);
    }
  }

  setUserInfo(id){
    databaseUtils.getUserInfo(id, (userInfo) => {
      this.setState({
        userInfo: userInfo
      })
    })
  }

  render() {
    const {changePageFn, active, loggedIn, showUser} = this.props
    const {userInfo} = this.state

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

              <HeaderTab key="userList" page="userList">List of users</HeaderTab>
              <HeaderTab key="list" page="list">List of books</HeaderTab>

              {this.props.loggedIn && <HeaderTab key="add" page="add">Add new book</HeaderTab>}
            </div>

            <div className="header-right">
              {loggedIn && userInfo && userInfo.username &&
                <div className="header-item">
                  <button
                    className="button is-success"
                    onClick={(e) => {
                      e.preventDefault()
                      showUser()
                    }}
                  >
                    {userInfo.username}
                  </button>
                </div>
              }
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
