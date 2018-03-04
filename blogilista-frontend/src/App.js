import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm';
import BlogList from './components/BlogList'


const Error = ({ message }) => {
  return message === null ? null :
    <div className='error' >
      {message}
    </div>
}

const Notification = ({ message }) => {
  return message === null ? null :
    <div className='notification'>
      {message}
    </div>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
      user: null,
      error: null,
      notification: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => {
      this.setState({ blogs })
      this.sortBlogsByLikes()
    })


    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      this.setState({ user: JSON.parse(loggedUserJSON) })
    }
  }

  sortBlogsByLikes() {
    this.setState({ blogs: this.state.blogs.sort((a, b) => b.likes - a.likes) })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNewBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title: this.state.blogTitle,
        author: this.state.blogAuthor,
        url: this.state.blogUrl
      })

      this.setState({
        blogTitle: '',
        blogAuthor: '',
        blogUrl: '',
        blogs: this.state.blogs.concat(blog),
        notification: 'a new blog \'' + blog.title + '\' by ' + blog.author + ' added'
      })
      setTimeout(
        () => {
          this.setState({ notification: null })
        }, 5000
      )
    } catch (exception) {
      this.setState({ error: 'could not add blog' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })


      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      this.setState({ notification: 'logged in as ' + user.name })
      setTimeout(
        () => {
          this.setState({ notification: null })
        }, 5000)
    } catch (exception) {
      this.setState({ error: 'incorrect credentials' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    this.setState({ user: null, notification: 'logged out' })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  handleLike = async (event, blog) => {
    event.preventDefault()
    try {
      let updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user._id
      }
      await blogService.update(updatedBlog, blog._id)
      const index = this.state.blogs.findIndex(element => element._id === blog._id)
      let updatedBlogs = this.state.blogs
      updatedBlogs[index].likes += 1
      this.setState({ blogs: updatedBlogs })
      this.sortBlogsByLikes()
    } catch (exception) {
      this.setState({ error: 'could not add like, try logging in first' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleDelete = async (event, blog) => {
    event.preventDefault()
    try {
      await blogService.deleteBlog(blog._id)
      this.setState({ blogs: this.state.blogs.filter(element => element._id !== blog._id) })
      this.setState({ notification: 'blog removed' })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    } catch (exception) {
      this.setState({ error: 'could not delete blog' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {


    return (
      <div className='mainPage'>
        <Error message={this.state.error} />
        <Notification message={this.state.notification} />
        {this.state.user === null ?
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
            handleSubmit={this.login}
          /> :
          <div>
            <LogoutForm logoutHandler={this.logout} name={this.state.user.name} />
            <Togglable buttonLabel='create blog'>
              <BlogForm
                title={this.state.blogTitle}
                author={this.state.blogAuthor}
                url={this.state.blogUrl}
                handleChange={this.handleNewBlogFieldChange}
                handleSubmit={this.createBlog}
              />
            </Togglable>
            <BlogList
              blogs={this.state.blogs}
              handleLike={this.handleLike}
              handleDelete={this.handleDelete}
            />
          </div>
        }
      </div>
    )
  }
}

export default App;
