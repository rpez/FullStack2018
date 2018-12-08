const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

const filter = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
  }
}

const blogsInDb = async () => {
  return await Blog.find({})
}

const filterUser = (user) => {
  return {
    name: user.name,
    username: user.username,
    adult: user.adult
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(filterUser)
}

module.exports = {
  filter, blogsInDb, initialBlogs, usersInDb
}