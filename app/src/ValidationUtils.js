const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1)

export function validateRequired(data, fields){
  const message = (field) => `${capitalize(field)} is required, please fill it.`

  return fields
    .filter((field) => data[field] === '')
    .map((field) => message(field))
}

export function validateNumberLength(text, length, title){
  return (new RegExp(`^\d{${length}}$`)).test(text) ? [] :
    [`${capitalize(title)} must have ${length} digits.`]
}

export const userRequired = (user) => validateRequired(user, ['email', 'password'])
