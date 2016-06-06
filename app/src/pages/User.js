import React from 'react'
import databaseUtils from './utils/DatabaseUtils'
import {userRequired} from '../ValidationUtils'

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      userInfo: null,
      userBooks: null,
      userComments: null,
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.userId !== this.props.userId){
      databaseUtils.getUserInfo(this.props.userId, this.userInfoCallback.bind(this))
    }
  }

  componentDidMount() {
    databaseUtils.getUserInfo(this.props.userId, this.userInfoCallback.bind(this))
  }

  userInfoCallback(userInfo){
    databaseUtils.getUserBooks(this.props.userId, this.userBooksCallback.bind(this), userInfo)
  }

  userBooksCallback(userBooks, userInfo){
    databaseUtils.getUserComments(this.props.userId, this.userCommentsCallback.bind(this), userInfo, userBooks)
  }

  userCommentsCallback(userComments, userInfo, userBooks){
    this.setState({
      userInfo: userInfo,
      userBooks: userBooks,
      userComments: userComments
    })
  }


  render() {
    const { showBookFn, deleteBookFn, loggedUser, userId, showUser} = this.props
    let userBooks = this.state.userBooks
    let userComments = this.state.userComments
    let userInfo = this.state.userInfo

    if (!userInfo || !userComments || !userBooks) {
      return (<div className="hero-content"></div>)
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
            {
              Object.keys(userBooks) && Object.keys(userBooks).length != 0 ?
                <div className="columns is-multiline t-books">
                  {
                    Object.keys(userBooks).map(key =>
                      <UserBook
                        key={key}
                        data={userBooks[key]}
                        showFn={() => showBookFn(key)}
                        loggedUserId={loggedUser()}
                        deleteFn={() => {if (confirm('Are you sure?')) deleteBookFn(key)}}
                        showUser={showUser}
                      />
                    )
                  }
                </div>
              :
                <div className="columns box">
                  <div className="card-content">
                    <div className="title is-5">{'You don\'t have any book yet...'}</div>
                  </div>
                </div>
            }
        <h3 className="subtitle">
          Comments
        </h3>
        {
          Object.keys(userComments) && Object.keys(userComments).length != 0 ?
              Object.keys(userComments).map(key =>
                <UsrComment
                  key = {key}
                  data ={userComments[key]}
                  showFn = {() => showBookFn(userComments[key].bookId)}
                />
              )
            :
              <div className="columns box">
                <div className="card-content">
                  <div className="title is-5">{'You don\'t have any comment of book yet...'}</div>
                </div>
              </div>
        }
      </div>
    )
  }
}

const UserBook = ({key, data: {title, author, year, description, userId, lend: {lend, lendUserName, lendUserId}}, showFn, deleteFn, loggedUserId, showUser}) => (
  <div key={key} className="column is-half">
    <div className="card is-fullwidth" key={Math.random()}>
      <div className="card-header">
        <div
          className="card-header-title"
          style={lend ? {backgroundColor: '#fdeeed', color: '#ed6c63'} : {}}
        >
          {title} {lend && loggedUserId == userId ?  <a onClick={() => {showUser(lendUserId)}} style={{color: '#ed6c63'}}> {': is lend to'} - {lendUserName} </a>    : ''}
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