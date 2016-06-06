import React from 'react'
import {firebaseUrl} from './config'

export default class BookDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: null,
      showCommentDialog: false
    }
  }

  componentWillMount() {
    const ref = new Firebase(firebaseUrl + '/comments')
    ref.orderByChild('bookId').equalTo(this.props.bookId).on('value', (data) => {
      this.setState({
        comments: data.val()
      })
    })
  }

  render() {
    const {book: {title, year, author, description, lend: {id, lend, name, date}},
             lendFn, returnFn, bookId, hasLended, loggedIn, addCommentFn, changePageFn} = this.props
    let comments = this.state.comments !== null ? this.state.comments : {}

    return (
      <div className="columns box">
        <div className="column is-half">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{author} - {year}</h2>
          <p>{description}</p>
          <hr/>
          <h3 className="subtitle">Comments</h3>
          {Object.keys(comments).map(key => <Comment key={key} data={comments[key]}/>)}
        </div>
        <div className="column is-half">
          <h2 className="subtitle">{lend ? `Book is lended to ${name}` : 'Book is waiting for you.'}</h2>
          <p>{lend && `${name} has borrowed this book on ${(new Date(date)).toLocaleString()}`}</p>
          {(loggedIn && (hasLended || !lend)) && <button
            className="button button--primary"
            onClick={() => {
              if (lend) {
                returnFn(bookId)
                this.setState({showCommentDialog: true})
              } else {
                lendFn(bookId)
              }
            }}
          >
            {lend ? 'Return book' : 'Lend book'}
          </button>}
          {!loggedIn && <p>Please <a href="#" onClick={(e) => {
              e.preventDefault()
              changePageFn('login')
            }}>log in</a> to borrow book.</p>}

          {this.state.showCommentDialog && <CommentForm addComment={(text) => addCommentFn(bookId, text)}/>}
        </div>
      </div>
    )
  }
}

const Comment = ({data: {authorId, date, text}}) => (
  <div className="card is-fullwidth">
    <div className="card-content">
      <p>{text}</p>
      <p><small>{new Date(date).toLocaleString()}</small></p>
    </div>
  </div>
)

class CommentForm extends React.Component {
  onSubmit(e) {
    e.preventDefault()
    const text = this.refs.text.value
    if (text !== '') {
      this.props.addComment(text)
      this.refs.text.value = ''
    } else {
      alert('Comment cannot be empty.')
    }
  }
  render() {
    return (
      <div>
        Comment
        <form onSubmit={this.onSubmit.bind(this)}>
          <textarea className="textarea" ref="text" cols="30" rows="10" placeholder="what do you think about it?"></textarea>
          <button className="button is-primary" type="submit">Comment</button>
        </form>
      </div>
    )
  }
}
