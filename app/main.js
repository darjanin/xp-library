import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src/Index'
import AddBookPage from './src/AddBookPage'
import BookList from './src/BookList'
import Navigation from './src/Navigation'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'add',
      books: []
    }
  }

  addBook(book) {
    let newBooks = [...this.state.books, book]

    this.setState({
      books: newBooks,
      page: "list"
    })
  }

  changePage(pageName) {
    this.setState({
      page: pageName
    })
  }

  render() {
    let page
    if (this.state.page === 'index') {
      page = <Index/>
    } else if (this.state.page === 'add') {
      page = <AddBookPage addFn={this.addBook.bind(this)} />
    } else if (this.state.page === 'list') {
      page = <BookList books={this.state.books}/>
    } else {
      page = <h1>404 Page not found</h1>
    }
    return (
        <div className="container">
          <Navigation changePageFn={this.changePage}/>
          { page }
        </div>
    )
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
