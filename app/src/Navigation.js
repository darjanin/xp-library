import React from 'react'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  listPage(e) {
    e.preventDefault()
    this.props.changePageFn('list')
    this.setState({active: 'list'})
  }

  addBookPage(e) {
    e.preventDefault()
    this.props.changePageFn('add')
    this.setState({active: 'add'})
  }

  render() {
    return (
        <header className="header">
          <div className="container">
            <div className="header-left">
              <a className="header-item" href="#">
                <img src="/logo.svg" alt="Logo" />
              </a>
              <a
                className={`header-tab ${this.state.active === 'list' ? 'is-active' : ''}`}
                onClick={this.listPage.bind(this)}
              >
                List of books
              </a>
               <span className="header-item">
                <a onClick={this.addBookPage.bind(this)} className="button is-primary" href="#">Add new book</a>
              </span>
            </div>

            <span className="header-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div className="header-right header-menu">



            </div>
          </div>
        </header>
    )
  }
}
