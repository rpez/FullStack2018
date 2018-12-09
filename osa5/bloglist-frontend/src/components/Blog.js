import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.blog = props.blog
    this.updateLikes = props.updateLikes
    this.deleteBlog = props.deleteBlog
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
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
        <div onClick={this.toggleVisibility} style={hideWhenVisible} className="title_author">
          {this.blog.title} {this.blog.author}
        </div>
        <div style={showWhenVisible} className="other_info">
          <div onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</div>
          <div>{this.blog.url}</div>
          <div>
            <div>{this.blog.likes} likes</div>
            <button onClick={this.updateLikes(this.blog)}>like</button>
          </div>
          <div>{adder}</div>
          <button onClick={this.deleteBlog(this.blog._id)}>delete</button>
        </div>
      </div>
    )
  }
}

export default Blog