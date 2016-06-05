const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1)

export function validateRequired(data, fields){
  const message = (field) => `${capitalize(field)} is required, please fill it.`

  return fields
    .filter((field) => data[field] === '')
    .map((field) => message(field))
}

export function validateNumberLength(text, length, title) {
  return (new RegExp(`^\d{${length}}$`)).test(text) ? [] :
    [`${capitalize(title)} must have ${length} digits.`]
}

export const validateMaxLength = (text, length, title) =>
  text.length <= length ? [] : [`${capitalize(title)} is long. Max length is ${length} characters.`]

export const validateMinLength = (text, length, title) =>
  text.length >= length ? [] : [`${capitalize(title)} is short. Min length is ${length} characters.`]

export const validateAlphaNum = (text, title) =>
  /^\w/.test(text) ? [] : [`${capitalize(title)} must contain only letters or numbers.`]

export function validateEmail(email) {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegExp.test(email) ? [] : ['Invalid email format.']
}

export const validateEqual = (textA, titleA, textB, titleB) =>
  textA === textB ? [] : [`${capitalize(titleA)} must be same as ${capitalize(titleB)}.`]

export const userRequired = (user) => validateRequired(user, ['email', 'password'])
