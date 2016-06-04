import React from 'react'
import {validateRequired, validateYearFormat} from './ValidationUtils'

export default class AddBookPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errors: [],
    }
  }

  getBookData({title, author, year, description}) {
    return {
      title: title.value,
      author: author.value,
      year: year.value,
      description: description.value,
      lend: {
        lend: false,
        id: '',
        name: '',
        date: '',
      },
    }
  }

  validate(book) {
    return [
      ...validateRequired(book),
      ...validateYearFormat(book.year),
    ]
  }

  onSubmit(e) {
    e.preventDefault()

    const book = this.getBookData(this.refs)
    const errors = this.validate(book)

    if (errors.length === 0) {
      this.props.addFn(book)
    } else {
      this.setState({errors: errors})
    }
  }

  render() {
    return (
      <div className="columns">
        <form className="column is-6 is-offset-3" onSubmit={this.onSubmit.bind(this)}>
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
