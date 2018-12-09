import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blogComponent
    const blog = {
        title: 'Title',
        author: 'Author',
        likes: 1,
        url: "www.a.com"
    }

    beforeEach(() => {
        blogComponent = shallow(
            <Blog blog={blog} updateLikes={() => {}} deleteBlog={() => {}}></Blog>
        )
    })

    it('displays only title and author by default', () => {
        const nameDiv = blogComponent.find('.title_author')

        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)
    })

    it('after clicking name the details are displayed', () => {
        const contentDiv = blogComponent.find('.other_info')
        contentDiv.simulate('click')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain(blog.likes)
    })
})