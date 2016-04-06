import React from 'react'

export default class BookList extends React.Component {
  renderBook(book) {
    const {title, author, year, description} = book

    return (
      <div className="column is-half">
        <div className="card" style={{width: '100%'}} key={Math.random()}>
          <div className="card-header">
            <div className="card-header-title">{title}</div>
          </div>
          <div className="card-content">
            <div className="title is-5">{author} - {year}</div>
            <div className="content">
              {description}
            </div>
          </div>

          <footer className="card-footer">
            <a className="card-footer-item">Show</a>
            <a className="card-footer-item">Edit</a>
            <a className="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="columns is-multiline">
          { this.props.books.map((book) => this.renderBook(book)) }
        </div>
      </div>
    )
  }
}