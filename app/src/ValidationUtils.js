export function validateRequired(book){
  const ERROR_MESSAGE_REQUIRED = ' is required, please fill it.'
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

