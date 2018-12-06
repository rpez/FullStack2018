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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    else {
        const authors = blogs.map(x => x.author)
        var current = authors[0]
        var currentMost = authors[0]
        var currentAmount = 1
        var amount = 0
        for (i = 0; i < authors.length; i++) {
            if (current === authors[i]) {
                currentAmount++
            }
            else {
                current = authors[i]
                currentAmount = 1
            }
            if (currentAmount > amount) {
                currentMost = authors[i]
                amount = currentAmount
            }
        }
        return {
            author: currentMost,
            blogs: amount
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null
    else {
        const authors = blogs.map(x => [ x.author, x.likes ])
        var current = authors[0][0]
        var currentMost = authors[0][0]
        var currentAmount = authors[0][1]
        var amount = 0
        for (i = 0; i < authors.length; i++) {
            if (current === authors[i][0]) {
                currentAmount += authors[i][1]
            }
            else {
                current = authors[i][0]
                currentAmount = authors[i][1]
            }
            if (currentAmount > amount) {
                currentMost = authors[i][0]
                amount = currentAmount
            }
        }
        return {
            author: currentMost,
            likes: amount
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}