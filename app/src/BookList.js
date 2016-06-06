import React from 'react'

export default class BookList extends React.Component {
  constructor(props) {
    super(props)
    let books =
    this.state = {
      searchValue: "",
      filteredBooks: props.books,
    }
  }

  onSearchInputChanged(e){
    let value = e.target.value
    this.setState({
      filteredBooks: this.filterBooks(value)
    })
  }

  filterBooks(value){
    let books = this.props.books
    if (!value) return books

    let lowerCaseValue = value.toLowerCase()
    let keys = Object.keys(books).filter(key => {
        let book = books[key]
        let title = book.title.toLowerCase()
        let author = book.author.toLowerCase()
        return title.indexOf(lowerCaseValue) >= 0 ||author.indexOf(lowerCaseValue) >= 0
      }
    )

    let filteredBooks = {}
    for (let i = 0; i < keys.length; i++)
      filteredBooks[keys[i]] = books[keys[i]]

    return filteredBooks
  }

  render() {
    const {showBookFn, deleteBookFn, loggedUser, showFilter} = this.props
    const {filteredBooks} = this.state

    return (
      <div className="">
        {showFilter &&
          <div className="">
            <label className="label">Search</label>
            <p className="control">
              <input className="input"
                     type="text"
                     placeholder="Part of the title or author`s name"
                     onChange={this.onSearchInputChanged.bind(this)}/>
            </p>
            <br/>
          </div>
        }

        <div className="columns is-multiline t-books">
          {Object.keys(filteredBooks).map((key) =>
              <Book
                key={key}
                data={filteredBooks[key]}
                showFn={() => showBookFn(key)}
                loggedUserId={loggedUser()}
                deleteFn={() => {if (confirm('Are you sure?')) deleteBookFn(key)}}
                />
          )}
        </div>
      </div>
    )
  }
}

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
