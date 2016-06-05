import React from 'react'

export default class Registration extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      localPage: 1,
      usersPerPage: 5,
    }
  }

  changeLocalPage(page) {
    this.setState({
      localPage: page
    })
  }

  checkLowerUserBound (index) {
    return index >= this.state.usersPerPage * (this.state.localPage - 1)
  }

  checkUpperUserBound (index) {
    return index < this.state.usersPerPage * this.state.localPage
  }

  getNextPage (index, numberOfPages){
    const nextPage = (index + 1) % (numberOfPages + 1)
    return nextPage == 0 ? 1 : nextPage
  }

  getPreviousPage (index, numberOfPages){
    return index - 1 < 1 ? numberOfPages : index - 1
  }

  showUser(id){
    this.props.showUserFn(id)
  }

  render() {
    const {users} = this.props
    const {localPage, usersPerPage} = this.state
    const numberOfPages = Math.ceil(users.length / usersPerPage)
    const nextPage = this.getNextPage(localPage, numberOfPages)
    const previousPage = this.getPreviousPage(localPage, numberOfPages)

    var self = this
    function changePage(e,page) {
      e.preventDefault()
      self.changeLocalPage(page)
    }

    return (
      <div className="">
        <nav className="pagination">
          <a className="button" onClick={(e) => changePage(e, previousPage)}>Previous</a>
          <a className="button" onClick={(e) => changePage(e, nextPage)}>Next page</a>
          <ul>

            { localPage - 1 > 1 &&
              <li><a className="button" onClick={(e) => changePage(e, 1)}>1</a></li>
            }
            { localPage - 1 > 1 &&
            <li><span>...</span></li>
            }

            { localPage - 1 > 0 &&
            <li><a className="button" onClick={(e) => changePage(e, localPage - 1)}>{localPage - 1}</a></li>
            }
            <li><a className="button is-primary" onClick={(e) => changePage(e, localPage)}>{localPage}</a></li>
            { localPage + 1 <= numberOfPages &&
            <li><a className="button" onClick={(e) => changePage(e, localPage + 1)}>{localPage + 1}</a></li>
            }

            { localPage + 2 <= numberOfPages &&
            <li><span>...</span></li>
            }
            { localPage + 2 <= numberOfPages &&
            <li><a className="button" onClick={(e) => changePage(e, numberOfPages)}>{numberOfPages}</a></li>
            }

          </ul>
        </nav>
        <br></br>
        <table className="table">
          <thead>
          <tr>
            <th>Username</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(users).map((key) =>
            this.checkLowerUserBound(key) && this.checkUpperUserBound(key) &&
            <tr key={key}><td><a onClick={(e) => {
              e.preventDefault()
              this.showUser(users[key].uid)}}
              >{users[key].username}</a></td></tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
