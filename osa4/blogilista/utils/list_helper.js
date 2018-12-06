const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.map(x => x.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    else {
        const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
        return max
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}