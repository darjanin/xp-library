import FireBase from 'firebase'
import {firebaseUrl} from '../../config'

let ref = new FireBase(firebaseUrl)
let cachedUser = null

let addNewUserToFireBase = function (newUser) {
  let key = newUser.uid
  let user = {
    email: newUser.email,
    uid: newUser.uid,
    token: newUser.token,
    username: newUser.username
  }

  ref.child('users').child(key).set(user)
}

let databaseUtils = {
  createUser: function (user, callback) {
    ref.createUser(user, function (error) {
      if (error) {
        let message = error.code
        callback(message)
      } else {
        this.loginWithPassword(user, function (auth) {
          addNewUserToFireBase({
            email: user.email,
            uid: auth.uid,
            token: auth.token,
            username: user.username
          })
        }, callback)
      }
    }.bind(this))
  },

  loginWithPassword: function (user, callback, callbackOnRegistered) {
    ref.authWithPassword(user, function (error, auth) {
      if (error) {
        let message = error.code
        if (callbackOnRegistered) {
          callbackOnRegistered(message)
        } else {
          callback && callback(message)
        }
      } else {
        auth.email = user.email
        cachedUser = auth
        this.onChange(true)

        if (callbackOnRegistered) {
          callback(auth)
          callbackOnRegistered(false)
        } else {
          callback && callback(false)
        }
      }
    }.bind(this))
  },

  isLoggedIn: function () {
    return cachedUser && true || ref.getAuth() || false
  },

  logout: function () {
    ref.unauth()
    cachedUser = null
    this.onChange(false)
  },

  getUserInfo: function (uid, callback) {
    if (!uid) return null

    console.log("efg")
    let userInfo = null
    let usersRef = ref.child('users')
    usersRef.orderByChild('uid').equalTo(uid).on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        callback(data.val())
      });
    });
  },

  getUserBooks: function (uid, callback, userInfo) {
    if (!uid || !callback || !userInfo) return null
    let userBooks = {}
    let booksRef = ref.child('books')
    let usersRef = ref.child('users')

    booksRef.orderByChild('userId').equalTo(uid).on('value', function (snapshot) {
      let counter = 0, size = 0
      snapshot.forEach((data) => {if (data.val().lend.lend) size++})

      snapshot.forEach(function (data) {
        let book = data.val()
        if (book.lend.lend) {
          let lend = book.lend
          usersRef.orderByChild('uid').equalTo(uid).on('value', function (usersSnapshot) {
            usersSnapshot.forEach(function (data) {
              lend.lendUserName = data.val().username
            });
            counter++
            if (counter == size) callback(userBooks, userInfo)
          });
        }
        userBooks[data.key()] = book
      })

      if (size == 0) callback(userBooks, userInfo)
    })
  },

  getUserComments: function (uid, callback, userInfo, userBooks) {
    if (!uid) return null
    let userComments = {}
    let commentsRef = ref.child('comments')
    let booksRef = ref.child('books')

    commentsRef.orderByChild('authorId').equalTo(uid).on('value', function (snapshot) {
      let counter = 0
      let size = 0
      snapshot.forEach((data) => {size++})
      snapshot.forEach(function (data) {
        let comment = data.val()
        booksRef.orderByChild('bookId').on('value', function (booksSnapShot) {
          booksSnapShot.forEach(function (bookData) {
            if (bookData.key() == comment.bookId) {
              comment.book = bookData.val()
              counter++
              if (counter == size) callback(userComments, userInfo, userBooks)
            }
          })
        })

        userComments[data.key()] = comment
      })

      if (size == 0) callback(userComments, userInfo, userBooks)
    })
  },

  getBookById: function (id) {
    if (id) return null
    let book = null
    let booksRef = ref.child('books')
    booksRef.orderByChild('title').on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        if (data.key() == id) {
          book = data.val()
        }
      })
    })
    return book
  }
}

module.exports = databaseUtils
