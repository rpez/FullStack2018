import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
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
  }

  addNote = (event) => {
    event.preventDefault()
    const blogObject = {
      title: String,
      author: String,
      url: String,
      likes: Number,
      // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: ''
        })
      })
  }

  login = (event) => {
    event.preventDefault()
    console.log('logging in with', this.state.username, this.state.password)
  }

  handleNoteChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    return (
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message={this.state.error} />

        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>

        <h2>Luo uusi muistiinpano</h2>

        <form onSubmit={this.addBlog}>
          <input
            value={this.state.newBlog}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>

        <h2>Muistiinpanot</h2>

        <div>
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )}
        </div>

      </div >
    )
  }
}

export default App