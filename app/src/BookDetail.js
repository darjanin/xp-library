import React from 'react'

export default class BookDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {book: {title, year, author, description, lend: {id, lend, name, date}}, lendFn, returnFn, bookId, hasLended, loggedIn} = this.props

    return (
      <div className="columns">
        <div className="column is-half">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{author} - {year}</h2>
          <p>{description}</p>

        </div>
        <div className="column is-half">
          <h2 className="subtitle">{lend ? `Book is lended to ${name}` : 'Book is waiting for you.'}</h2>
          <p>{lend && `${name} has borrowed this book on ${(new Date(date)).toLocaleString()}`}</p>
          {(loggedIn && (hasLended || !lend)) && <button
            className="button"
            onClick={() => lend ? returnFn(bookId) : lendFn(bookId)}
          >
            {lend ? 'Return book' : 'Lend book'}
          </button>}
          {!loggedIn && <p>Please sign up to borrow book.</p>}

        </div>
      </div>
    )
  }
}
