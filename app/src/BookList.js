import React from 'react'

export default ({books, showBookFn, deleteBookFn, loggedUser}) => (
  <div className="columns is-multiline t-books">
    {Object.keys(books).map((key) =>
      <Book
        key={key}
        data={books[key]}
        showFn={() => showBookFn(key)}
        loggedUserId={loggedUser()}
        deleteFn={() => {if (confirm('Are you sure?')) deleteBookFn(key)}}
      />
    )}
  </div>
)

const Book = ({key, data: {title, author, year, description, userId, lend: {lend}}, showFn, deleteFn, loggedUserId}) => (
  <div key={key} className="column is-half">
    <div className="card is-fullwidth" key={Math.random()}>
      <div className="card-header">
        <div
          className="card-header-title"
          style={lend ? {backgroundColor: '#fdeeed', color: '#ed6c63'} : {}}
        >
          {title}
        </div>
      </div>
      <div className="card-content">
        <div className="title is-5">{author} - {year}</div>
        <div className="content">
          {description}
        </div>
      </div>

      <footer className="card-footer">
        <a className="card-footer-item" onClick={showFn}>Show</a>
        <a className="card-footer-item">Edit</a>
        {userId === loggedUserId && !lend &&
          <a className="card-footer-item" onClick={deleteFn}>Delete</a>
        }
      </footer>
    </div>
  </div>
)
