import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTitle: '',
            newAuthor: '',
            newUrl: ''
        }
        this.updateBlogs = props.updateBlogs
        this.notify = props.notify
    }

    addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: this.state.newTitle,
            author: this.state.newAuthor,
            url: this.state.newUrl
        }

        try {
            const newBlog = await blogService.create(blogObject)
            this.setState({
                newTitle: '',
                newAuthor: '',
                newUrl: ''
            })
            this.updateBlogs(newBlog)
            this.notify(`added blog ${newBlog.title}`, false)
        } catch (exception) {
            console.log(exception)
            this.notify('blog creation unsuccessful', true)
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (

            <div>
                <form onSubmit={this.addBlog}>
                    <div>
                        <div>title</div>
                        <input
                            type="text"
                            name="newTitle"
                            value={this.state.newTitle}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <div>author</div>
                        <input
                            type="text"
                            name="newAuthor"
                            value={this.state.newAuthor}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div>
                        <div>url</div>
                        <input
                            type="text"
                            name="newUrl"
                            value={this.state.newUrl}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

export default BlogForm