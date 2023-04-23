import { describe, test, expect, beforeAll  } from "vitest"

const isDev = process.env.NODE_ENV === 'development'

describe('list class unit tests', () => {

    let user = User();
    let username = "user test"

    let name = "list test"
    let name2 = "list test second"

    let li : ListItem;
    let li2 = new ListItem();

    let text = "one thing I need to do"
    let newText = "something new I need to do"
  

    test('constructor', () => {
        li = new ListItem({ text: "one thing I need to do" })

        expect(li.isEmpty()).toBeFalsy()
    })

    test('create', () => {
        li2.create({ text: text })

        expect(li2.isEmpty()).toBeFalsy()
    })

    test('get checked', () => {
        expect(li2.checked()).toBeFalsy()
    })

    test('get text', () => {
        expect(li2.getText()).toEqual(text)
    })

    test('set text', () => {
        li2.setText({ text: text })

        expect(li2.getText()).toEqual(text)
    })

    test('toggle check', () => {

        li2.toggleCheckItem({ text: text })

        expect(li2.checked()).toBeTruthy()
    })

    test('delete', () => {
        li2.delete({ text: text })

        expect(li2.isEmpty()).toBeTruthy()
    })

})

describe('users database tests', () => {


})