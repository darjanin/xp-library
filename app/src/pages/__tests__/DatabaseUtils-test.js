jest.unmock('../utils/DatabaseUtils')
jest.unmock('firebase')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import databaseUtils from '../utils/DatabaseUtils'

describe('DatabaseUtils', () => {
  let defaultTimeout = 1000
  let value = 3

  function timeoutPromise(cb) {
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        cb()
        resolve()
       },1)
    })
  }

  let callback = function(){
    value = 4
  }

  beforeEach(function(){
    defaultTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
    value = 3
  })

  xit('version1: promises ', () => {
  //pit('version1: promises ', () => {
    return timeoutPromise(callback).then(() => expect(value).toEqual(4));
  });

  xit("version2: await async", async () => {
  //pit("version2: await async", async () => {
    await timeoutPromise(callback)
    expect(value).toEqual(4)
  });

  afterEach(function(){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTimeout
  })
})