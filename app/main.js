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
      page: 'list',
      books: [{
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }, {
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }, {
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }]
    }
  }

  addBook(book) {
    let newBooks = [...this.state.books, book]

    this.setState({
      books: newBooks,
      page: "add"
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
        <div className="">
          <Navigation changePageFn={this.changePage.bind(this)} active={this.state.page}/>
          { page }
        </div>
    )
  }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
