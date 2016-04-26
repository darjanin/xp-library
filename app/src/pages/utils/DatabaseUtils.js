import FireBase from 'firebase'

//const forge = "https://sweltering-heat-4077.firebaseio.com/" //Ondro
const forge = "https://torrid-heat-4247.firebaseio.com" // Adam
let ref = new FireBase(forge)
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
        console.log('error')
      } else {
        console.log('login')
        this.loginWithPassword(user, function (auth) {
          console.log('loged')
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
    this.onChange(false);
  }
}

module.exports = databaseUtils