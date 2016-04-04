import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src/Index.js'
import Navigation from './src/navigation.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'index'
    }
  }

  render() {
    return (
        <div className="container">
          <Navigation/>
          { this.state.page === 'index' ? <Index/> : null }
        </div>
    )
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
