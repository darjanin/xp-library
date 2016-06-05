jest.unmock('../AddBookPage')
jest.unmock('../ValidationUtils')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import AddBookPage, {createBook, validate} from '../AddBookPage'

describe('AddBookPage', () => {
  let bookDummy = {
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }

  it('get book data', () => {
    const book = Object.assign({}, bookDummy, {
      lend: {
        lend: false,
        id: '',
        name: '',
        date: '',
      }
    })
    const createdBook = createBook(bookDummy)
    expect(createdBook).toEqual(book)
  })

  it('has all fields empty', () => {
    const emptyBook = {title: '', author: '', year: '', description: ''}
    const createdBook = createBook(emptyBook)
    expect(validate(createdBook).length).toEqual(4)
  })
  //
  // it('cleans fields after save', () => {
  //   const addBookPage = TestUtils.renderIntoDocument(
  //     <AddBookPage addFn={(book) => {}} />
  //   )
  //
  //   const form = TestUtils.findRenderedDOMComponentWithTag(addBookPage, 'form')
  //
  //   addBookPage.refs.title.value = bookDummy.title
  //   addBookPage.refs.author.value = bookDummy.author
  //   addBookPage.refs.year.value = bookDummy.year
  //   addBookPage.refs.description.value = bookDummy.description
  //
  //   TestUtils.Simulate.submit(
  //     form
  //   )
  //
  //   expect(addBookPage.refs.title.value).toEqual('')
  //   expect(addBookPage.refs.author.value).toEqual('')
  //   expect(addBookPage.refs.year.value).toEqual('')
  //   expect(addBookPage.refs.description.value).toEqual('')
  // })

})
