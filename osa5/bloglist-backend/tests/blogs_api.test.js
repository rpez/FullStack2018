const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const { filter, blogsInDb, usersInDb, initialBlogs } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})
  await User.remove({})
  let blog = new Blog(initialBlogs[0])
  await blog.save()

  blog = new Blog(initialBlogs[1])
  await blog.save()
})

test('blogs are returned as json', async () => {
  const blogs = await blogsInDb()

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogs.length)
  expect(response.body.map(b => b.title)).toContain("Go To Statement Considered Harmful")
})


test('a new blog can be created', async () => {
  const blogsInitially = await blogsInDb()

  const newBlog = {
    author: 'Matti Luukkainen',
    title: 'osa 4',
    url: 'http://localhost:4000/osa4/',
    likes: 2,
  }

  const posti = await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsInApp = (await blogsInDb()).map(filter)

  expect(blogsInApp.length).toBe(blogsInitially.length + 1)

})

test('a new blog gets by default 0 likes', async () => {
  const newBlog = {
    author: 'Matti Luukkainen',
    title: 'osa 4',
    url: 'http://localhost:4000/osa4/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAfterOperation = await api
    .get('/api/blogs')

  const blogsInApp = await blogsInDb()

  newBlog.likes = 0
  expect(blogsInApp.map(filter)).toContainEqual(newBlog)
})

test('if a required field missing, blog is not created ', async () => {
  const newBlog = {
    author: 'Matti Luukkainen',
    title: 'osa 4',
  }

  const blogsBeforeOperation = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterOperation = await blogsInDb()

  expect(blogsBeforeOperation.body).toEqual(blogsAfterOperation.body)
})

test('contents of a blog can be alteder', async () => {
  const blogsBeforeOperation = await blogsInDb()

  const blogToAlter = blogsBeforeOperation[0]

  const alteredBlog = {
    author: blogToAlter.author,
    title: blogToAlter.title,
    url: blogToAlter.url,
    likes: blogToAlter.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToAlter._id}`)
    .send(alteredBlog)
    .expect(200)

  const blogsAfterOperation = await blogsInDb()
  expect(blogsAfterOperation.map(filter)).toContainEqual(alteredBlog)
})

test('a blog can be deleted', async () => {
  const blogsBeforeOperation = await blogsInDb()

  const blogToDelete = blogsBeforeOperation[0]

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  const blogsAfterOperation = await blogsInDb()

  expect(blogsAfterOperation.length).toEqual(blogsBeforeOperation.length - 1)
  expect(blogsAfterOperation.map(filter)).not.toContainEqual(filter(blogToDelete))
})


describe.only('cereation of new users', () => {
  beforeAll(async () => {
    const user = new User({
      username: 'hellas',
      name: 'Arto Hellas',
      adult: false
    })

    await user.save()
  })

  test('fails if username is not unique', async () => {
    const usersAtStart = await usersInDb()

    const user = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'sekred'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body).toEqual({ error: 'username must be unique' })

    const usersAfterOperation = await usersInDb()

    expect(usersAtStart).toEqual(usersAfterOperation)
  })

  test('fails if password too short', async () => {
    const usersAtStart = await usersInDb()

    const user = {
      username: 'heikki',
      name: 'Heikki Lokki',
      password: 'se'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body).toEqual({ error: 'password too short' })

    const usersAfterOperation = await usersInDb()

    expect(usersAtStart).toEqual(usersAfterOperation)
  })

  test('adult defaults to true', async () => {
    const user = {
      username: 'heikki',
      name: 'Heikki Lokki',
      password: 'sekret'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)

    const usersAfterOperation = await usersInDb()

    const heikki = {
      username: 'heikki',
      name: 'Heikki Lokki',
      adult: true
    }

    expect(usersAfterOperation).toContainEqual(heikki)
  })

})

afterAll(() => {
  server.close()
})