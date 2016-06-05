import React from 'react'
import {validateRequired, validateNumberLength} from './ValidationUtils'

export default class AddBookPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errors: [],
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const {title, author, year, description} = this.refs
    const book = createBook({
      title: title.value,
      author: author.value,
      year: year.value,
      description: description.value,
    })

    const errors = validate(book)

    if (errors.length === 0) {
      this.props.addFn(book)
    } else {
      this.setState({errors: errors})
    }
  }

  render() {
    return (
      <div className="columns">
        <form className="column is-6 is-offset-3" id="form" onSubmit={this.onSubmit.bind(this)}>
          <h1 className="title">
            Add new book
          </h1>

          {['title', 'author', 'year'].map(ref => (
            <div className="control" key={`key-${ref}`}>
              <input className="input" type="text" ref={ref} placeholder={ref}/>
            </div>
          ))}

          <div className="control">
            <textarea className="textarea" type="text" ref="description" placeholder="description" />
          </div>

          {this.state.errors.length > 0 &&
            <div className="message is-danger">
              <ul className="message-body">
                {this.state.errors.map((error, index) => <li key={`error-${index}`}>{error}</li>)}
              </ul>
            </div>
          }

          <button className="button is-primary" type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export function createBook(book) {
  return Object.assign({}, book, {
    lend: {
      lend: false,
      id: '',
      name: '',
      date: '',
    },
  })
}

export function validate(book) {
  return [
    ...validateRequired(book, ['title', 'author', 'year']),
    ...validateNumberLength(book.year, 4, 'year'),
  ]
}
