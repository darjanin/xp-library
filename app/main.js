import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src/pages/Index'
import Login from './src/pages/Login'
import Registration from './src/pages/Registration'
import Navigation from './src/Navigation'
import databaseUtils from './src/pages/utils/DatabaseUtils'

class App extends React.Component {
  constructor(props) {
    super(props)
    let loggedIn = databaseUtils.isLoggedIn()
    this.state = {
      page: 'index',
      loggedIn: loggedIn
    }
  }

  handleLogout(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
    this.changePage('index')
  }

  componentWillMount() {
    databaseUtils.onChange = this.handleLogout.bind(this)
  }

  changePage(pageName) {
    this.setState({
      page: pageName
    })
  }

  render() {
    let page
    if (this.state.page === 'index') {
      page = <Index/>
    } else if (this.state.page === 'login') {
      page = <Login/>
    } else if (this.state.page === 'registration') {
      page = <Registration/>
    } else {
      page = <h1>404 Page not found</h1>
    }

    return (
      <div className="container">
        <Navigation changePageFn={this.changePage.bind(this)} loggedIn={this.state.loggedIn}/>
        { page }
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
