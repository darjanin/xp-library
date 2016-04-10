import FireBase from 'firebase'

const forge = "https://sweltering-heat-4077.firebaseio.com/"
let ref = new FireBase(forge)
let cachedUser = null

let addNewUserToFireBase = function (newUser) {
  let key = newUser.uid
  ref.child('users').child(key).set(newUser)
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
            token: auth.token
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
    this.onChange(false);
  }
}

module.exports = databaseUtils