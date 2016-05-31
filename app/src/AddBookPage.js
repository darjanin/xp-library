import React from 'react'
import {validateRequired, validateYearFormat} from './ValidationUtils'

export default class AddBookPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errors: []
    }
  }

  onSubmit(e) {
    e.preventDefault()

    let book = {
      title: this.refs.title.value,
      author: this.refs.author.value,
      year: this.refs.year.value,
      description: this.refs.description.value,
      lend: {
        lend: false,
        id: '',
        name: '',
        date: ''
      }
    }

    let errorsMessages = []
    errorsMessages = errorsMessages.concat(validateRequired(book))
    errorsMessages = errorsMessages.concat(validateYearFormat(book.year))

    if(errorsMessages.length === 0)
    {
      this.props.addFn(book)

      for (let ref in this.refs) {
        this.refs[ref].value = ''
      }
    } else {
      this.setState({errors: errorsMessages})
    }
  }

  render() {
    let error = ''
    let length = this.state.errors.length
    let errorMessages = this.state.errors.map(function(error, i) {
      return length - 1 == i ? error: [error, <br/>]
    })
    if (errorMessages.length > 0){
      error = <div className="message is-danger"> <div className="message-body"> {errorMessages} </div> </div>
    }

    return (<div className="columns">
      <form className="column is-6 is-offset-3" onSubmit={this.onSubmit.bind(this)}>
        <div className="hero-content">
          <h1 className="title">
            Add new book
          </h1>
        </div>

        <div className="control">
        <input className="input" type="text" ref="title" placeholder="title"/>
        </div>
        <div className="control">
        <input className="input" type="text" ref="author" placeholder="author"/>
        </div>
        <div className="control">
        <input className="input" type="text" ref="year" placeholder="year"/>
        </div>
        <div className="control">
        <textarea className="textarea" type="text" ref="description" placeholder="description"></textarea>
        </div>
        {error}
        <button className="button is-primary" type="submit">Add</button>
      </form>
    </div>)
  }
}
