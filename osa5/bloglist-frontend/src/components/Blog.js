import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.blog = props.blog
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
        <div onClick={this.toggleVisibility} style={hideWhenVisible}>
          {this.blog.title} {this.blog.author}
        </div>
        <div style={showWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.blog.title} {this.blog.author}</div>
          <div>{this.blog.url}</div>
          <div>
            <div>{this.blog.likes} likes</div>
            <button>like</button>
          </div>
          <div>{adder}</div>
        </div>
      </div>
    )
  }
}

export default Blog