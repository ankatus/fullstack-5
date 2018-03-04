import React from 'react'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => (
    <div>
        <h3>create new</h3>
        <form onSubmit={handleSubmit}>
            <div>
                title
        <input
                    type='text'
                    name='blogTitle'
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div>
                author
        <input
                    type='text'
                    name='blogAuthor'
                    value={author}
                    onChange={handleChange}
                />
            </div>
            <div>
                url
        <input
                    type='text'
                    name='blogUrl'
                    value={url}
                    onChange={handleChange}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    </div>
)

export default BlogForm