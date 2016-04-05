jest.unmock('../Index')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Index from '../Index'

describe('Index', () => {
  const index = TestUtils.renderIntoDocument(
    <Index name="Fero"/>
  )
  const indexNode = ReactDOM.findDOMNode(index)

  it('says hello', () => {
    const h1Node = indexNode.children[0]

    expect(h1Node.textContent).toEqual('Welcome to Virtual Library')
  })

  it('rise button', () => {
    expect(index.refs.count.textContent).toEqual('0')

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(index, 'button')
    )

    expect(index.refs.count.textContent).toEqual('2')
  })
})