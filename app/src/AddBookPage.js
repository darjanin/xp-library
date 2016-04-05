import React from 'react'

export default class AddBookPage extends React.Component {
  onSubmit(e) {
    e.preventDefault()

    let book = {
      title: this.refs.title.value,
      author: this.refs.author.value,
      year: this.refs.year.value,
      description: this.refs.description.value
    }

    this.props.addFn(book)
  }

  render() {
    return (<div>
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" ref="title" placeholder="title"/>
        <input type="text" ref="author" placeholder="author"/>
        <input type="text" ref="year" placeholder="year"/>
        <textarea type="text" ref="description" placeholder="description"></textarea>
      </form>
    </div>)
  }
}