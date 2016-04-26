import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src/Index'
import AddBookPage from './src/AddBookPage'
import BookList from './src/BookList'
import Login from './src/pages/Login'
import Registration from './src/pages/Registration'
import Navigation from './src/Navigation'
import databaseUtils from './src/pages/utils/DatabaseUtils'
import Firebase from 'firebase'

class App extends React.Component {
  constructor(props) {
    super(props)
    let loggedIn = databaseUtils.isLoggedIn()
    this.forge = "https://flickering-fire-362.firebaseio.com"
    this.state = {
      page: 'list',
      books: {},
    loggedIn: false,
    }
  }

  componentDidMount() {
    let booksRef = new Firebase(this.forge + '/books')
    let newBooks
    booksRef.on("value", (snapshot) => {
      newBooks = snapshot.val()
      console.log(newBooks);
      this.setState({books: newBooks})
    }, function (errorObject) {
      console.error("The read failed: " + errorObject.code)
    })
  }

  addBook(book) {
    let booksRef = new Firebase(this.forge + '/books')
    booksRef.push().set(book)

    this.setState({
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

// Softwarové projekty mohou být zábavné, produktivní a dokonce i smělé. Přesto mohou zůstávat řízené a přinášet zisk. Mnoha lidem se extrémní programování (XP) jeví jako střízlivé a praktické. Proč je pak nazýváno extrémní? XP používá běžně používané principy a postupy, avšak dotahuje je do extrémů.
// XP bylo koncipováno a vyvinuto tak, aby vyhovovalo specifickým potřebám malých a středně velkých softwarových týmů, které musí reagovat na mlhavá a často se měnící zadání. XP je považováno za kontroverzní, protože neuznává některé „posvátné krávy“. Tato nová, odlehčená metodika totiž odmítá řadu klasických zásad včetně stále přetrvávajícího názoru, že náklady na zapracování změny v projektu prudce rostou s časem jejího zadání. XP např. uznává, že je třeba se neustále snažit o snižování nákladů, ale liší se v názoru na to, co s uspořenými náklady – XP tým je nepředá nadřízeným, ale ihned je využije pro další vývoj.
// Extrémní programování je známé některými svými na první pohled podivnými pravidly. Mezi nejznámější patří zásada programování v párech, kdy u jednoho počítače spolu vždy pracují dva programátoři. Přesto zkušenost ukazuje, že zavedením XP se produktivita týmu přibližně zdvojnásobí.
// Extrémní programování můžete milovat nebo nenávidět. Tato knížka vás však donutí k tomu, abyste se znovu podívali na to, jakým způsobem vyvíjíte software.
