import React from 'react'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  sayHello(name = 'Martin') {
    return `Hello ${name}`
  }

  render() {
    return (
        <main className="content">
          <h1>Welcome to Virtual Library</h1>
          <p>{this.sayHello(this.props.name)}</p>
          <p ref="count">{this.state.count}</p>
          <button onClick={() => this.setState({count: this.state.count + 2})}>Rise</button>
        </main>
    )
  }
}

Index.propTypes = {
  name: React.PropTypes.string
}