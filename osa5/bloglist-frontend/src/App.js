import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      showAll: true,
      message: null,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      this.notify('login successful', false)
    } catch (exception) {
      this.notify('wrong username or password', true)
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  notify = (message, isError) => {
    this.setState({
      error: isError,
      message: message
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 2000)
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  updateBlogs = (blog) => {
    this.setState({ blogs: this.state.blogs.concat(blog) })
  }

  updateLikes = (blog) => {
    return async () => {
      try {
        const blogObject = {
          _id: blog._id,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
          user: blog.user._id
        }

        const newBlog = await blogService.update(blog._id, blogObject)

        this.setState({
          blogs: this.state.blogs.map(x => x._id !== newBlog._id ? x : newBlog)
        })
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  deleteBlog = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.filter(x => x._id === id)

        if (window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
          await blogService.deleteBlog(id)
          this.setState({ blogs: this.state.blogs.filter(x => x._id !== id) })
          this.notify('blog deleted', false)
        }
        else this.notify('deletion cancelled', false)
      } catch (exception) {
        console.log(exception)
        this.notify('delete not successful', true)
      }
    }
  }

  render() {

    const loginForm = () => (
      <div>
        <h1>Log in to application</h1>

        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h1>blogs</h1>
        <p>{this.state.user.name} logged in</p>
        <button onClick={() => window.localStorage.removeItem('loggedNoteappUser')}>logout</button>
        <h2>create new</h2>
        <Togglable buttonLabel="create new" >
          <BlogForm updateBlogs={this.updateBlogs} notify={this.notify} />
        </Togglable>
      </div>
    )

    return (
      <div>
        <Notification message={this.state.message} isError={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <div>
              {blogForm()}
            </div>
            <div>
              {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog._id} blog={blog} updateLikes={this.updateLikes} deleteBlog={this.deleteBlog} />
              )}
            </div>
          </div>
        }

      </div >
    )
  }
}

export default App