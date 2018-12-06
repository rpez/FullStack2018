const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.map(x => x.likes).reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}