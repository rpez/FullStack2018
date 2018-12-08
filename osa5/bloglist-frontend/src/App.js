import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      showAll: true,
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
    } catch (exception) {
      this.setState({
        error: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
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
        <BlogForm updateBlogs={this.updateBlogs} />
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <div>
              {blogForm()}
            </div>
            <div>
              {this.state.blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
              )}
            </div>
          </div>
        }

      </div >
    )
  }
}

export default App