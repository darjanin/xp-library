
let validatorUtil = {
  validateUsername: function (name)
  {
    if (name.length > 15) {
      return 'User name is to long! Name must contain 3-15 characters.'
    }
    if (name.length < 3) {
      return 'User name is to short! Name must contain 3-15 characters.'
    }
    let rex = /^[A-Za-z0-9]+$/
    if (!rex.test(name)) {
      return 'Name must contain only alphanumeric characters.'
    }
    return '';
  },
  validateEmail: function (email) {
    let rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!rex.test(email)) {
      return 'Invalid email format.';
    }
    return '';
  },
  validatePassword: function (password1, password2) {
    if (password1 != password2) {
      return 'Password is not equals with passwordCheck.'
    }
    if (password1.length < 6) {
      return 'Password must have more then six characters.'
    }
    let rex = /^[A-Za-z0-9]+$/
    if (!rex.test(password1)) {
      return 'Must contains alphanumeric characters.'
    }
    return '';
  }
}

module.exports = validatorUtil