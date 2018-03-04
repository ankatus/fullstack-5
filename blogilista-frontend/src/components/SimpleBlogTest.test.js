import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('renders title', () => {
        const blog = {
            title: 'blog title'
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
        const titleAndAuthorDiv = simpleBlogComponent.find('.titleAndAuthor')

        expect(titleAndAuthorDiv.text()).toContain(blog.title)
    })
    it('renders author', () => {
        const blog= {
            author: 'blog author'
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
        const titleAndAuthorDiv = simpleBlogComponent.find('.titleAndAuthor')

        expect(titleAndAuthorDiv.text()).toContain(blog.author)
    })
    it('renders likes', () => {
        const blog = {
            likes: 5
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(likesDiv.text()).toContain(blog.likes)
    })
    it('clicking the like button calls likeHandler twice', () => {
        const blog = {
            title: 'asdf',
            author: 'asdf',
            likes: 0
        }

        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})