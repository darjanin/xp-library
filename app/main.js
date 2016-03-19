import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'

class FirebaseBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 10,
      ref: new Firebase("https://flickering-fire-362.firebaseio.com"),
      books: []
    }
  }

  componentWillMount() {
    let booksRef = this.state.ref.child('books')
    booksRef.on("child_added", (snapshot, prevChildKey) => {
      this.setState({books: snapshot.val()})
    })
  }

  formSubmit(e) {
    e.preventDefault()
    let title = this.refs.title
    let year = this.refs.year
    let newBooks = [{title: title.value, year: year.value},...this.state.books]
    title.value = ""
    year.value = ""

    // this.state.ref.push().set(newBooks) // firebase
    let booksRef = this.state.ref.child('books')
    booksRef.push().set(newBooks)

    this.setState({
      books: newBooks
    })
  }

  render() {
    return (
      <div className="container">
        <div className="navbar">
          <form onSubmit={this.formSubmit.bind(this)}>
            <div className="control">
              <input type="text" className="input" ref='title' placeholder="Title" />
            </div><div className="control">
              <input type="text" className="input" ref='year' placeholder="Year" />
            </div><div className="control">
              <button type="submit" className="button is-success">+ Add</button>
            </div>
          </form>
        </div>
      <div className="">
        {this.state.books.map((book) => <Book title={book.title} year={book.year}/>)}
      </div>
      </div>
    )
  }
}

class Book extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {title, year, lended = false} = this.props
    return (
      <div className="media box">
        <div className="media-content">
          <p style={{color: '#333'}}>
            <strong>{title}</strong> <small>{year}</small>
          </p>
        </div>

        <div className="media-right control">
          <label className="checkbox">
            Lend <input type="checkbox"/>
          </label>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  title: React.PropTypes.string.isRequired,
  year: React.PropTypes.string.isRequired,
  lended: React.PropTypes.bool
}

ReactDOM.render(
  <FirebaseBox/>,
  document.getElementById('app')
);