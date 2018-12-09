import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/__mocks__/blogs')
import blogService from './services/__mocks__/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            const loginForm = app.find('form')
            expect(blogComponents.length).toEqual(0)
            expect(loginForm.text()).toContain('username')
            expect(loginForm.text()).toContain('password')
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }

            localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all notes are rendered', () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(blogService.blogs.length)
        })
    })
})