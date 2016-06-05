import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src/Index'
import AddBookPage from './src/AddBookPage'
import UserList from './src/UserList'
import BookList from './src/BookList'
import BookDetail from './src/BookDetail'
import Login from './src/pages/Login'
import Registration from './src/pages/Registration'
import User from './src/pages/User'
import Navigation from './src/Navigation'
import databaseUtils from './src/pages/utils/DatabaseUtils'
import Firebase from 'firebase'
import {firebaseUrl} from './src/config'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'list',
      activeBook: null,
      activeBookComments: {},
      books: {},
      users: [],
      loggedIn: databaseUtils.isLoggedIn(),
      userToShow: null,
    }
  }

  componentDidMount() {
    const ref = new Firebase(firebaseUrl)

    let booksRef = ref.child('books')
    booksRef.on("value", (snapshot) => {
      const newBooks = snapshot.val()
      this.setState({books: newBooks})
    }, function (errorObject) {
      console.error("The read failed: " + errorObject.code)
    })

    let userRef = ref.child('users')
    userRef.on("value", (snapshot) => {
      const newUsers = Object.keys(snapshot.val()).map((key) => snapshot.val()[key])

      // TODO database .orderByChild
      this.setState({users: newUsers.sort((x,y) => x.username > y.username)})
    }, function (errorObject) {
      console.error("The read failed: " + errorObject.code)
    })
  }

  cleanBooks() {
    if (confirm('Are you sure?')) {
      let booksRef = new Firebase(firebaseUrl + '/books')
      booksRef.set(null)
    }
  }

  getLoggedUserId() {
    if (this.state.loggedIn) {
      const ref = new Firebase(firebaseUrl)
      const authData = ref.getAuth()
      return authData.uid
    }
    return null
  }


  addBook(book) {
    const ref = new Firebase(firebaseUrl)
    const authData = ref.getAuth()
    let booksRef = ref.child('books')
    booksRef.push().set(Object.assign({}, book, {
      userId: authData.uid
    }))

    this.changePage('list')
  }

  addComment(bookId, text) {
    const ref = new Firebase(firebaseUrl + `/comments`)
    ref.push({
      bookId: bookId,
      authorId: this.getLoggedUserId(),
      text: text,
      date: Date.now()
    })
  }

  getComment() {
    // const commentsRef = ref.child('comments')
    // commentsRef.orderByChild('bookId').equalTo(this.state.activeBook).once('value', (data) => {
    //   this.setState({
    //     activeBookComments: data.val()
    //   })
    // })
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

  lendBook(bookId) {
    const ref = new Firebase(firebaseUrl)
    const authData = ref.getAuth()
    console.log(authData)
    if (authData) {
      const bookRef = ref.child('/books').child(bookId)
      bookRef.update({
        lend: {
          lend: true,
          id: authData.uid,
          name: authData.password.email,
          date: Date.now()
        }
      })
    }
  }

  returnBook(bookId) {
    const ref = new Firebase(firebaseUrl)

    const bookRef = ref.child('books').child(bookId)
    bookRef.update({
      lend: {
        lend: false,
        id: '',
        name: '',
        date: ''
      }
    })
  }

  bookLendedToLoggedUser(book) {
    const ref = new Firebase(firebaseUrl)
    const authData = ref.getAuth()
    const {lend: {lend, id}} = book

    return lend && authData && authData.uid === id
  }

  showBook(bookId) {
    this.setState({
      page: 'book',
      activeBook: bookId
    })
  }

  deleteBook(bookId) {
    const ref = new Firebase(firebaseUrl)
    const bookRef = ref.child('books').child(bookId)
    bookRef.remove()
  }

  showUser(userId){
    if (!userId && !this.state.loggedIn) return
    if (!userId) userId = databaseUtils.getUserInfo().uid

    console.log(userId)
    this.setState({
      userToShow: userId
    })

    this.changePage('user')
  }

  render() {
    let page
    if (this.state.page === 'index') {
      page = <Index/>
    } else if (this.state.page === 'add') {
      page = <AddBookPage addFn={this.addBook.bind(this)} />
    } else if (this.state.page === 'list') {
      page = <BookList
        books={this.state.books ? this.state.books : {}}
        showBookFn={this.showBook.bind(this)}
        deleteBookFn={this.deleteBook.bind(this)}
        loggedUser={this.getLoggedUserId.bind(this)}
      />
    } else if (this.state.page === 'userList') {
      page = <UserList
        showUserFn={this.showUser.bind(this)}
        users={this.state.users ? this.state.users : {}}
        />
    } else if (this.state.page === 'login') {
      page = <Login/>
    } else if (this.state.page === 'registration') {
      page = <Registration/>
    } else if (this.state.page === 'book' && this.state.activeBook !== null) {
      page = <BookDetail
        book={this.state.books[this.state.activeBook]}
        bookId={this.state.activeBook}
        lendFn={this.lendBook.bind(this)}
        returnFn={this.returnBook.bind(this)}
        loggedIn={this.state.loggedIn}
        hasLended={this.bookLendedToLoggedUser(this.state.books[this.state.activeBook])}
        addCommentFn={this.addComment.bind(this)}
        changePageFn={this.changePage.bind(this)}
      />
    } else if (this.state.page === 'user') {
      page = <User
        userId={this.state.userToShow}
        showBookFn={this.showBook.bind(this)}
        deleteBookFn={this.deleteBook.bind(this)}
        loggedUser={this.getLoggedUserId.bind(this)}
      />
    } else {
      page = <h1>404 Page not found</h1>
    }
    return (
      <div className="">
        <Navigation
          changePageFn={this.changePage.bind(this)}
          loggedIn={this.state.loggedIn}
          active={this.state.page}
          showUser={this.showUser.bind(this)}
        />
        <div className="message">
          <div className="message-body">
            <div className="container">
              <button
                className="button is-danger"
                onClick={this.cleanBooks.bind(this)}
              >
                Delete books from firebase
              </button>
            </div>
          </div>
        </div>

        <div className="container" style={{marginTop: '20px'}}>
          {page}
        </div>
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
