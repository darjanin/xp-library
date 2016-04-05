import React from 'react'

export default class BookList extends React.Component {
  renderBook(book) {
    const {title, author, year, description} = book

    return (
      <div key={Math.random()}>
        <div>{title}</div>
        <div>{author}</div>
        <div>{year}</div>
        <div>{description}</div>
      </div>
    )
  }
  render() {
    return (
      <div className="columns">
        { this.props.books.map((book) => this.renderBook(book)) }
      </div>
    )
  }
}