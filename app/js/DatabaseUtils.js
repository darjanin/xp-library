import FireBase from 'firebase'

let forge = "https://sweltering-heat-4077.firebaseio.com/"
let ref = new FireBase(forge)
let cachedUser = null

let addNewUserToFB = function (newUser) {
  let key = newUser.uid
  ref.child('users').child(key).set(newUser)
}

let databaseUtils = {
  createUser: function (user, cb) {
    ref.createUser(user, function (err) {
      if (err) {
        let message = err.code
        console.log(message)
        cb(message)
      } else {
        this.loginWithPW(user, function (authData) {
          addNewUserToFB({
            email: user.email,
            uid: authData.uid,
            token: authData.token
          })
        }, cb)
      }
    }.bind(this))
  },

  loginWithPW: function (userObj, cb, cbOnRegister) {
    ref.authWithPassword(userObj, function (err, authData) {
      if (err) {
        let message = err.code
        if (cbOnRegister) {
          cbOnRegister(message)
        } else {
          cb && cb(message)
        }
        console.log(message)
      } else {
        authData.email = userObj.email
        cachedUser = authData
        this.onChange(true)
        if (cbOnRegister) {
          cb(authData)
          cbOnRegister(false)
        } else {
          cb && cb(false)
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