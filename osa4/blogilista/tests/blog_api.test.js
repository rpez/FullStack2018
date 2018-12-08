const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

beforeAll(async () => {
    await Blog.remove({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('all blogs are returned', () => {
    test('when GET /api/blogs is called', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
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

        const blogsBefore = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        const titles = blogsAfter.map(x => x.title)
        expect(titles).toContain(newBlog.title)
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

        const response = await helper.blogsInDb()

        expect(response.find(x => x.title === newBlog.title).likes).toBe(0)
    })

    test('blog without title is not added ', async () => {
        const noTitleBlog = {
            author: 'Some new one',
            url: 'www.asfd.com',
            likes: 0
        }

        const initialBlogs = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)

        const response = await helper.blogsInDb()

        expect(response.length).toBe(initialBlogs.length)
    })

    test('blog without url is not added ', async () => {
        const noTitleBlog = {
            title: 'New Test Blog',
            author: 'Some new one',
            likes: 0
        }

        const initialBlogs = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)

        const response = await helper.blogsInDb()

        expect(response.length).toBe(initialBlogs.length)
    })
})

describe.only('user creation', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username and proper password', async () => {
        const usersBeforeOperation = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await helper.usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await helper.usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users fails with proper statuscode and message if password shorter than 3 letters', async () => {
        const usersBeforeOperation = await helper.usersInDb()

        const newUser = {
            username: 'badpasswordguy',
            name: 'A guy with bad password',
            password: 'aa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'password must be at least 3 letters long' })

        const usersAfterOperation = await helper.usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })
})

afterAll(() => {
    server.close()
})