const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

beforeAll(async () => {
    await Blog.remove({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('all blogs are returned', () => {
    test('when GET /api/blogs is called', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
    })
})

describe('blog is correctly formatted', () => {

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'New Test Blog',
            author: 'Some new one',
            url: 'www.asfd.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(titles).toContain('New Test Blog')
    })

    test('note with likes not defined gets 0 likes', async () => {
        const newBlog = {
            title: 'New Test Blog',
            author: 'Some new one',
            url: 'www.asfd.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        expect(response.body.find(x => x.title === newBlog.title).likes).toBe(0)
    })

    test('blog without title is not added ', async () => {
        const noTitleBlog = {
            author: 'Some new one',
            url: 'www.asfd.com',
            likes: 0
        }

        const initialBlogs = await api
            .get('/api/blogs')

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)

        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.body.length)
    })

    test('blog without url is not added ', async () => {
        const noTitleBlog = {
            title: 'New Test Blog',
            author: 'Some new one',
            likes: 0
        }

        const initialBlogs = await api
            .get('/api/blogs')

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)

        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.body.length)
    })
})

afterAll(() => {
    server.close()
})