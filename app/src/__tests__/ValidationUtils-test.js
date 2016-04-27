jest.unmock('../ValidationUtils')

import TestUtils from 'react-addons-test-utils'
import {validateRequired, validateYearFormat, userRequired} from '../ValidationUtils'


describe('ValidationUtils', () => {

  describe('it validates user login', () => {
    let userDummy = {}
    beforeEach(function() {
      userDummy = {
        email: "demo@demo.sk",
        password: "demodemo"
      }
    })

    it('email required', () => {
      userDummy.email = ''
      expect(userRequired(userDummy)[0]).toEqual("Email is required, please fill it.")
    })

    it('password required', () => {
      userDummy.password = ''
      expect(userRequired(userDummy)[0]).toEqual("Password is required, please fill it.")
    })
  })

  describe('it validates book', () => {
    let bookDummy = {}
    beforeEach(function() {
      bookDummy = {
        title: "Harry Potter a Extremne programovanie",
        author: "F.S.K.I.G.",
        year: "2013",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim sequi veniam nulla deleniti unde doloremque, exercitationem sit quidem. Facilis dolores atque libero temporibus sit incidunt totam odio officia error deleniti fugit repellendus sint aliquam eos quae architecto illum doloribus reiciendis, enim, at distinctio voluptates vero commodi! Quaerat cum et rerum, harum esse asperiores."
      }
    })

    it('title required', () => {
      bookDummy.title = ''
      expect(validateRequired(bookDummy)[0]).toEqual("Title is required, please fill it.")
    })

    it('author required', () => {
      bookDummy.author = ''
      expect(validateRequired(bookDummy)[0]).toEqual("Author is required, please fill it.")
    })

    it('year required', () => {
      bookDummy.year = ''
      expect(validateRequired(bookDummy)[0]).toEqual("Year is required, please fill it.")
    })

    it('year is string with digits', () => {
      let year = 'asdfasdf'
      expect(validateYearFormat(year)[0]).toEqual("Year must have four digits.")
    })

    it('year is string with length four', () => {
      let year = '45678'
      expect(validateYearFormat(year)[0]).toEqual("Year must have four digits.")
    })
  })
})