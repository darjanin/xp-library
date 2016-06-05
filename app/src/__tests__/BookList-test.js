jest.unmock('../BookList')
jest.unmock('../AddBookPage')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import BookList from '../BookList'
import {createBook} from '../AddBookPage'

describe('BookList', () => {
  const bookDummy = {
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }
  const book = createBook(bookDummy)
  const booksDummy = [book, book]
  const bookList = TestUtils.renderIntoDocument(
    <div><BookList books={booksDummy} loggedUser={() => ''} /></div>
  ) // Stateless components (function not class) doesnt return reference. Wraping it in div helps.
  const bookListNode = ReactDOM.findDOMNode(bookList)
  // Prefix for test classes is 't-'
  const bookListChildren = bookListNode.getElementsByClassName('t-books')[0].children

  it('lists all books', () => {
    expect(bookListChildren.length).toEqual(booksDummy.length)
  })
})
