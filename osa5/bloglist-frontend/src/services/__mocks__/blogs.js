let token = null

const blogs = [
    {
        _id: "5c0c4d8cfbe3f02b0464049c",
        title: "a",
        author: "a",
        url: "a",
        likes: 0,
        user: {
            _id: "5c0b2511db48465b84192c2d",
            username: "some2",
            name: "Some One"
        },
        __v: 0
    },
    {
        _id: "5c0c4ddffbe3f02b0464049e",
        title: "b",
        author: "b",
        url: "a",
        likes: 0,
        user: {
            _id: "5c0b251bdb48465b84192c2e",
            username: "some1",
            name: "Some One"
        },
        __v: 0
    },
    {
        _id: "5c0c6330fbe3f02b0464049f",
        title: "c",
        author: "c",
        url: "c",
        likes: 0,
        user: {
            _id: "5c0b2511db48465b84192c2d",
            username: "some2",
            name: "Some One"
        },
        __v: 0
    },
    {
        _id: "5c0c6340fbe3f02b046404a0",
        title: "d",
        author: "d",
        url: "d",
        likes: 0,
        user: {
            _id: "5c0b251bdb48465b84192c2e",
            username: "some1",
            name: "Some One"
        },
        __v: 0
    },
    {
        _id: "5c0c6345fbe3f02b046404a1",
        title: "e",
        author: "e",
        url: "e",
        likes: 0,
        user: {
            _id: "5c0b251bdb48465b84192c2e",
            username: "some1",
            name: "Some One"
        },
        __v: 0
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }