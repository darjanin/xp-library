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

  getUserInfo: function () {
    let userInfo = null
    let localRef = new Firebase(firebaseUrl + '/users')
    let auth = ref.getAuth()
    if (!auth){
      return null;
    }
    localRef.orderByChild('uid').equalTo(auth.uid).on('value', function(snapshot) {
      snapshot.forEach(function(data) {
        userInfo = data.val()
      });
    });
    
    return userInfo;
  },

  getUserBooks: function (uid) {
    let userBooks = {}
    let localRef = new FireBase(firebaseUrl + '/books')
    localRef.orderByChild('userId').equalTo(uid).on('value', function(snapshot) {
      snapshot.forEach(function (data) {
        userBooks[data.key()] = data.val()
      })
    })
    return userBooks
  },

  getUserComments: function (uid) {
    let userComments = {}
    let localRef = new FireBase(firebaseUrl + '/comments')
    localRef.orderByChild('authorId').equalTo(uid).on('value', function(snapshot) {
      snapshot.forEach(function (data) {
        userComments[data.key()] = data.val()
      })
    })
    return userComments
  },

  getBookById: function (id) {
    let book = null
    let localRef = new FireBase(firebaseUrl + '/books')
    localRef.orderByChild('title').on('value', function(snapshot) {
      snapshot.forEach(function (data) {
        if (data.key() == id)
        {
          book = data.val()
        }
      })
    })
    return book
  }


}

module.exports = databaseUtils
