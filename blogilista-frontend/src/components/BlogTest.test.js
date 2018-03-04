import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    it('before clicking the name only title and author are rendered', () => {
        const user = {
            username: 'user name',
            name: 'real name'
        }
        const blog = {
            title: 'blog title',
            author: 'blog author',
            url: 'blog url',
            likes: 1,
            user
        }

        const mockHandleLike = jest.fn()
        const mockHandleDelete = jest.fn()
        const blogComponent = shallow(<Blog blog={blog}
            handleLike={mockHandleLike}
            handleDelete={mockHandleDelete}
        />)
        const blogMinimizedDiv = blogComponent.find('.blogMinimized')

        expect(blogMinimizedDiv.text()).toContain(blog.title + ' ' + blog.author)
        expect(blogMinimizedDiv.text()).not.toContain(blog.url)
        expect(blogMinimizedDiv.text()).not.toContain(blog.likes)
    })
    it('after clicking the name full details are rendered', () => {
        const user = {
            username: 'user name',
            name: 'real name'
        }
        const blog = {
            title: 'blog title',
            author: 'blog author',
            url: 'blog url',
            likes: 5,
            user
        }

        const mockHandleLike = jest.fn()
        const mockHandleDelete = jest.fn()
        const blogComponent = shallow(<Blog
            blog={blog}
            handleLike={mockHandleLike}
            handleDelete={mockHandleDelete}
        />)
        const toggle = blogComponent.find('.blogToggleMinimized')
        toggle.simulate('click')
        const blogMaximizedDiv = blogComponent.find('.blogMaximized')

        expect(blogMaximizedDiv.text()).toContain(blog.title)
        expect(blogMaximizedDiv.text()).toContain(blog.author)
        expect(blogMaximizedDiv.text()).toContain(blog.url)
        expect(blogMaximizedDiv.text()).toContain(blog.likes)
    })
})