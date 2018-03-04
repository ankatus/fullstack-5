import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete}) => (
    <div>
        <h2>blogs</h2>
        {blogs.map(blog => {
            return (
                <Blog
                    key={blog._id}
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
            )
        }
        )}
    </div>
)

export default BlogList