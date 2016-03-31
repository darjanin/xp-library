import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import Index from './src/Index.js'
import Navigation from './src/navigation.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content : <Index/>
    }
  }

  render() {
    return (
        <main className="container">
          <Navigation/>
          {this.state.content}
        </main>
    )
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);