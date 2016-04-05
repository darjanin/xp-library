jest.unmock('../BookList')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import BookList from '../BookList'

describe('BookList', () => {
  const bookDummy = {
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }

  const booksDummy = [bookDummy, bookDummy]

  const bookList = TestUtils.renderIntoDocument(
    <BookList books={booksDummy} />
  )
  const bookListNode = ReactDOM.findDOMNode(bookList)

  const bookListChildren = bookListNode.children

  it('lists all books', () => {
    expect(bookListChildren.length).toEqual(booksDummy.length)

    // const form = TestUtils.findRenderedDOMComponentWithTag(bookList, 'form')
  })

  // it('right details of books', () => {
  //   for (let i = 0; i < booksDummy.length; i++) {
  //     let title = bookListChildren[i].children[0]
  //   }
  //   expect(returnedBook).toEqual(bookDummy)
  // })
})