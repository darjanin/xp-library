const ERROR_MESSAGE_REQUIRED = ' is required, please fill it.'

export function validateRequired(book){
  let errorMessages = []
  
  if(book.title === ''){
    errorMessages.push('Title' + ERROR_MESSAGE_REQUIRED)
  }
  if(book.author === ''){
    errorMessages.push('Author' + ERROR_MESSAGE_REQUIRED)
  }
  if(book.year === ''){
    errorMessages.push('Year' + ERROR_MESSAGE_REQUIRED)
  }

  return errorMessages
}

export function validateYearFormat(year){
  if(year.match(/^\d{4}$/) === null){
    return ['Year must have four digits.']
  }
  return []
}

export function userRequired(user){
  let errorMessages = []

  if(user.email === ''){
    errorMessages.push('Email' + ERROR_MESSAGE_REQUIRED)
  }
  if(user.password === ''){
    errorMessages.push('Password' + ERROR_MESSAGE_REQUIRED)
  }
  return errorMessages
}



