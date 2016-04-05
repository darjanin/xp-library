jest.unmock('../AddBookPage')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import AddBookPage from '../AddBookPage'

describe('AddBookPage', () => {
  const bookDummy = {
    title: "Harry Potter a Extremne programovanie",
    author: "F.S.K.I.G.",
    year: "2013",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
  }

  it('add dummy book', () => {
    const addBookFn = (book) => {
      returnedBook = book
    }

    const addBookPage = TestUtils.renderIntoDocument(
      <AddBookPage addFn={addBookFn} />
    )
    const addBookPageNode = ReactDOM.findDOMNode(addBookPage)

    let returnedBook = {}
    const form = TestUtils.findRenderedDOMComponentWithTag(addBookPage, 'form')

    addBookPage.refs.title.value = bookDummy.title
    addBookPage.refs.author.value = bookDummy.author
    addBookPage.refs.year.value = bookDummy.year
    addBookPage.refs.description.value = bookDummy.description

    TestUtils.Simulate.submit(
      form
    )

    expect(returnedBook).toEqual(bookDummy)
  })
  // const index = TestUtils.renderIntoDocument(
  //   <Index name="Fero"/>
  // )
  // const indexNode = ReactDOM.findDOMNode(index)

  // it('says hello', () => {
  //   const h1Node = indexNode.children[0]

  //   expect(h1Node.textContent).toEqual('Welcome to Virtual Library')
  // })

  // it('rise button', () => {
  //   expect(index.refs.count.textContent).toEqual('0')

  //   TestUtils.Simulate.click(
  //     TestUtils.findRenderedDOMComponentWithTag(index, 'button')
  //   )

  //   expect(index.refs.count.textContent).toEqual('2')
  // })
})