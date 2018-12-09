import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    const blog = {
        title: 'Title',
        author: 'Author',
        likes: 1
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    it('renders title and author', () => {
        const titleAuthorDiv = blogComponent.find('.title_author')

        expect(titleAuthorDiv.text()).toContain(blog.title)
        expect(titleAuthorDiv.text()).toContain(blog.author)
    })

    it('renders likes', () => {
        const titleAuthorDiv = blogComponent.find('.likes')

        expect(titleAuthorDiv.text()).toContain(blog.likes)
    })

    it('clicking the button twice event handler twice', () => {
        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <SimpleBlog
                blog={blog}
                onClick={mockHandler}
            />
        )

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})