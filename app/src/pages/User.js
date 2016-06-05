import React from 'react'
import databaseUtils from './utils/DatabaseUtils'
import {userRequired} from '../ValidationUtils'

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
    }
  }

  render() {
    const { showBookFn, deleteBookFn, loggedUser} = this.props
    let userBooks = null
    let userComments = null
    let userInfo = databaseUtils.getUserInfo()

    if (userInfo) {
      userBooks = databaseUtils.getUserBooks(userInfo.uid)
      userComments = databaseUtils.getUserComments(userInfo.uid)
    }

    let keys = Object.keys(userBooks)
    for (let i = 0; i < keys.length; i++)
    {
      if(userBooks[keys[i]].lend.lend)
      {
        let lend = userBooks[keys[i]].lend
        lend.lendUserName = databaseUtils.getUserInfo(lend.id).username
      }
    }

    keys = Object.keys(userComments)
    for (let i = 0; i < keys.length; i++)
    {
      userComments[keys[i]].book = databaseUtils.getBookById(userComments[keys[i]].bookId)
    }

    return (
      <div className="hero-content">
        <h1 className="title">
          {userInfo.username}
        </h1>
        <h3 className="subtitle">
          Basic information
        </h3>
          <div className="columns box">
            <div className="card-content">
              <div className="title is-5">{'Username:'} {userInfo.username}</div>
              <div className="title is-5">{'Email:'} {userInfo.email}</div>
            </div>
          </div>
        <h3 className="subtitle">
          Books
        </h3>
          <div className="columns is-multiline t-books">
            {Object.keys(userBooks).map((key) =>
              <UserBook
                key={key}
                data={userBooks[key]}
                showFn={() => showBookFn(key)}
                loggedUserId={loggedUser()}
                deleteFn={() => {if (confirm('Are you sure?')) deleteBookFn(key)}}
              />
            )}
          </div>
        <h3 className="subtitle">
          Comments
        </h3>
        {Object.keys(userComments).map(key =>
          <UsrComment
            key = {key}
            data ={userComments[key]}
            showFn = {() => showBookFn(userComments[key].bookId)}
          />
        )}
      </div>
    )
  }
}

const UserBook = ({key, data: {title, author, year, description, userId, lend: {lend, lendUserName}}, showFn, deleteFn, loggedUserId}) => (
  <div key={key} className="column is-half">
    <div className="card is-fullwidth" key={Math.random()}>
      <div className="card-header">
        <div
          className="card-header-title"
          style={lend ? {backgroundColor: '#fdeeed', color: '#ed6c63'} : {}}
        >
          {title} {lend ? ': is lent to - ' + lendUserName : ''}
        </div>
      </div>
      <div className="card-content">
        <div className="title is-5">{author} - {year}</div>
        <div className="content">
          {description}
        </div>
      </div>

      <footer className="card-footer">
        <a className="card-footer-item" onClick={showFn}>Show</a>
        <a className="card-footer-item">Edit</a>
        {userId === loggedUserId && !lend &&
        <a className="card-footer-item" onClick={deleteFn}>Delete</a>
        }
      </footer>
    </div>
  </div>
)

const UsrComment = ({key, data: {authorId, date, text, book: {title, author}}, showFn}) => (
  <div key={key} className="card is-fullwidth">
    <div className="card-header">
      <div
        className="card-header-title"
        style={{backgroundColor: '#d3d3d3'}}
      >
        <a onClick={showFn} style={{color: '#000000'}}> {author} - {title} </a>
      </div>
    </div>
    <div className="card-content">
      <p>{text}</p>
      <p><small>{new Date(date).toLocaleString()}</small></p>
    </div>
  </div>
)