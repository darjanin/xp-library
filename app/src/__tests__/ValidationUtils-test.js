jest.unmock('../ValidationUtils')

import TestUtils from 'react-addons-test-utils'
import {validateRequired, validateNumberLength, userRequired} from '../ValidationUtils'


describe('ValidationUtils', () => {
  // export function validateNumberLength(text, length, title) {
  //   return (new RegExp(`^\d{${length}}$`)).test(text) ? [] :
  //     [`${capitalize(title)} must have ${length} digits.`]
  // }
  describe('valdiateNumberLength', () => {
    it ('doesnt accept other characters than digit', () => {
      expect(validateNumberLength('hello', 4, 'text').length).toEqual(1)
    })

    it ('has only 4 digits', () => {
      expect(validateNumberLength('1234', 4, 'text').length).toEqual(0)
    })
  })

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
      const validated = validateRequired(bookDummy, ['title', 'author', 'year'])
      expect(validated[0]).toEqual("Title is required, please fill it.")
    })

    it('author required', () => {
      bookDummy.author = ''
      const validated = validateRequired(bookDummy, ['title', 'author', 'year'])
      expect(validated[0]).toEqual("Author is required, please fill it.")
    })

    it('year required', () => {
      bookDummy.year = ''
      const validated = validateRequired(bookDummy, ['title', 'author', 'year'])
      expect(validated[0]).toEqual("Year is required, please fill it.")
    })

    it('year is string with digits', () => {
      let year = 'asdfasdf'
      expect(validateNumberLength(year, 4, 'year')[0]).toEqual("Year must have 4 digits.")
    })

    it('year is string with 4 four', () => {
      let year = '45678'
      expect(validateNumberLength(year, 4, 'year')[0]).toEqual("Year must have 4 digits.")
    })
  })
})
