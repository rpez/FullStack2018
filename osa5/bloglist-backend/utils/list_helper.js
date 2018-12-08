const dummy = (blogs) => {
    return 1
  }
  
  const byLikes = (b1, b2) => b2.likes - b1.likes
  
  const totalLikes = (blogs) => {
    const sumReducer = (sum, i) => sum+i
    return blogs.map(b=>b.likes).reduce(sumReducer, 0)
  }
   
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
    
    const favorite = blogs.sort(byLikes)[0]
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
  
  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const reducer = (obj, blog) => {
      obj[blog.author] = ( obj[blog.author] || 0 ) + 1
      return obj
    }
  
    const authors = blogs.reduce(reducer, {})
  
    const blogCounts = Object.keys(authors).map(name => {
      return { author: name, blogs: authors[name]}
    })
  
    const byBlogs = (b1, b2) => b2.blogs - b1.blogs
  
    return blogCounts.sort(byBlogs)[0]
  }
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const reducer = (obj, blog) => {
      obj[blog.author] = (obj[blog.author] || 0) + blog.likes
      return obj
    }
  
    const authors = blogs.reduce(reducer, {})
  
    const blogCounts = Object.keys(authors).map(name => {
      return { author: name, likes: authors[name] }
    })
  
    return blogCounts.sort(byLikes)[0]
  }
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }