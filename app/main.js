import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src/Index'
import AddBookPage from './src/AddBookPage'
import BookList from './src/BookList'
import Login from './src/pages/Login'
import Registration from './src/pages/Registration'
import Navigation from './src/Navigation'
import databaseUtils from './src/pages/utils/DatabaseUtils'

class App extends React.Component {
  constructor(props) {
    super(props)
    let loggedIn = databaseUtils.isLoggedIn()
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
      }],
    loggedIn: false,
    }
  }

  addBook(book) {
    let newBooks = [...this.state.books, book]

    this.setState({
      books: newBooks,
      page: 'list'
    })
  }

  handleLogout(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
    this.changePage('list')
  }

  componentWillMount() {
    databaseUtils.onChange = this.handleLogout.bind(this)
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
    } else if (this.state.page === 'login') {
      page = <Login/>
    } else if (this.state.page === 'registration') {
      page = <Registration/>
    } else {
      page = <h1>404 Page not found</h1>
    }
    return (
      <div className="">
        <Navigation changePageFn={this.changePage.bind(this)} loggedIn={this.state.loggedIn} active={this.state.page}/>
        { page }
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
