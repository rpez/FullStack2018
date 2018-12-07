const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test Blog',
        author: 'Some one',
        url: 'www.asfd.com',
        likes: 0
    },
    {
        title: 'Another Test Blog',
        author: 'Some one another',
        url: 'www.fdsa.com',
        likes: 1
    }
]

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

module.exports = {
    initialBlogs, formatBlog, nonExistingId, blogsInDb
}