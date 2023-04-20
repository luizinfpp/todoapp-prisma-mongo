import { describe, test, expect  } from "vitest"

const isDev = process.env.NODE_ENV === 'development'

describe('list class unit tests', () => {

    test('constructor', () => {
        
        user2 = new User({ name: newName })

        expect(user2.isEmpty()).toBeFalsy()
        expect(user2.getName()).toEqual(newName)
    })

    test('create user and get name', () => {
        
        user.create({ name: name })

        expect(user.isEmpty()).toBeFalsy()
        expect(user.getName()).toEqual(name)
    })

    test('fetch user lists', () => {
        let lists = user.fetchLists()

        expect(lists).toBeInstanceOf(List[])
    })

    test('delete user', () => {
        user2.delete({ name: newName })

        expect(user2.isEmpty()).toBeTruthy()
    })

    test('set new name', () => {
        user.setName({ name: newName })

        expect(user.getName()).toEqual(newName)
    })

    test('get user', () => {
        user2.get({ name: newName })

        expect(user2.isEmpty()).toBeFalsy()
    })

})

describe('users database tests', () => {


})