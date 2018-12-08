import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.blog = props.blog
    this.updateLikes = props.updateLikes
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  like = async (blog) => {
    try {
      const blogObject = {
        _id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user._id
      }

      const newBlog = await blogService.update(blog._id, blogObject, { new: true })
      this.updateLikes(newBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    let adder = <div>hasn't been added by any user</div>
    if (this.blog.user !== undefined) {
      adder = <div>added by {this.blog.user._id}</div>
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility} style={hideWhenVisible}>
          {this.blog.title} {this.blog.author}
        </div>
        <div style={showWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</div>
          <div>{this.blog.url}</div>
          <div>
            <div>{this.blog.likes} likes</div>
            <button onClick={() => this.like(this.blog)}>like</button>
          </div>
          <div>{adder}</div>
        </div>
      </div>
    )
  }
}

export default Blog