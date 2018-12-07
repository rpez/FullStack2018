const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request, response) => {
    try {
        const body = new Blog(request.body)

        if (body.url === undefined || body.title === undefined) {
            return response.status(400).json({ error: 'title or url missing' })
        }

        newLikes = 0
        if (body.likes !== undefined) newLikes = body.likes

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: newLikes
        })

        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exeption) {
        console.log(exeption)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = blogsRouter