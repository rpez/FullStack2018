const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(Blog.format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}