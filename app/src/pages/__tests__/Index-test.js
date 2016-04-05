jest.unmock('../Index')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Index from '../Index'

describe('Index', () => {
  it('says hello', () => {
    const index = TestUtils.renderIntoDocument(
      <Index />
    )

    const indexNode = ReactDOM.findDOMNode(index)
    const h1Node = indexNode.children[0]


    expect(h1Node.textContent).toEqual('Welcome to Virtual Library')

    // Simulate a click and verify that it is now On
    // TestUtils.Simulate.change(
    //   TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
    // );
    // expect(checkboxNode.textContent).toEqual('On');
  })
})