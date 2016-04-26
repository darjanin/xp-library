import React from 'react'

export default class BookList extends React.Component {

  render() {
    let booksElements = []
    Object.keys(this.props.books).forEach(
      (key) => booksElements.push(<Book key={key} data={this.props.books[key]}/>)
    )
    return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="columns is-multiline t-books">
          {booksElements}
        </div>
      </div>
    )
  }
}

const Book = (props) => {
  const {key, data} = props

  return (
    <div key={key} className="column is-half">
      <div className="card" style={{width: '100%'}} key={Math.random()}>
        <div className="card-header">
          <div className="card-header-title">{data.title}</div>
        </div>
        <div className="card-content">
          <div className="title is-5">{data.author} - {data.year}</div>
          <div className="content">
            {data.description}
          </div>
        </div>

        <footer className="card-footer">
          <a className="card-footer-item">Show</a>
          <a className="card-footer-item">Edit</a>
          <a className="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
  )
}
