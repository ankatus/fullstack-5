import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

describe('<App />', () => {
    let app

    describe('when not logged', () => {

        beforeEach(() => {
            app = mount(<App />)
        })

        it('renders only login form', () => {
            app.update()
            const loginForms = app.find(LoginForm)
            const blogs = app.find(Blog)
            expect(loginForms.length).toBe(1)
            expect(blogs.length).toBe(0)
        })
    })

    describe('when logged in', () => {

        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '123123123',
                name: 'testaaja'
            }
            localStorage.setItem('loggedUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('renders blogs', () => {

            app.update()
            const blogs = app.find(Blog)
            expect(blogs.length).toBe(2)
        })
    })
})