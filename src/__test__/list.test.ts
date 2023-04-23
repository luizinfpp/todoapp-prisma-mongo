import { describe, test, expect, beforeAll  } from "vitest"

const isDev = process.env.NODE_ENV === 'development'

describe('list class unit tests', () => {

    let user = User();
    let username = "user test"

    let name = "list test"
    let name2 = "list test second"

    let list : List;
    let list2 = new List();

    let text = "something I need to do"
    let newText = "something new I need to do"

    beforeAll(() => {
        user.create({ name: username })
    })    

    test('constructor', () => {
        
        list = new List({ name: name, user: user })

        expect(list.isEmpty()).toBeFalsy()
    })

    test('create user and get name', () => {
        
        list2.create({ name: name2, user: user })

        expect(list2.isEmpty()).toBeFalsy()
        expect(list2.getName()).toEqual(name2)
    })

    test('get list', () => {
        expect(list2.getList()).resolves.toBeInstanceOf(List)
    })

    test('get user', () => {
        expect(list2.getUser()).toEqual(user)
    })

    test('add item', () => {
        expect(list2.addItem({ text: text })).resolves.toHaveReturned()
    })

    test('get items', () => {
        expect(list2.getItems()).resolves.toBeInstanceOf(ListItem[]).toHaveLength(1)
    })

    test('check item', () => {
        expect(list2.toggleCheckItem({ text: text })).resolves.toHaveReturned()
    })

    test('delete item', () => {
        expect(list2.deleteItem({ text: text })).resolves.toHaveReturned()
    })

    test('delete list', () => {
        list.delete({ name: name })

        expect(list.isEmpty()).toBeTruthy()
    })

    test('set new name', () => {
        list2.setName({ name: name })

        expect(list2.getName()).toEqual(name)
    })

    test('change item text', () => {
        list2.setItemText({ old: text, new: newText })

        expect(list2.getItems().filter(i => i.text == newText)).toHaveLength(1)
    })

    test('get user', () => {
        user2.get({ name: newName })

        expect(user2.isEmpty()).toBeFalsy()
    })

})

describe('users database tests', () => {


})