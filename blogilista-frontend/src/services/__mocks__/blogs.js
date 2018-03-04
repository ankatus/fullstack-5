let token = null
const blogs = [
    {
        "_id": "5a9bd5a721516b5254a96281",
        "title": "blog1",
        "author": "author1",
        "url": "url1",
        "user": {
            "_id": "5a99728fe6c63e69329c03c7",
            "username": "user1",
            "name": "name1"
        },
        "likes": 1
    },
    {
        "_id": "5a9be6febb04d57e3687c296",
        "title": "title2",
        "author": "author2",
        "url": "url2",
        "user": {
            "_id": "5a99728fe6c63e69329c03c7",
            "username": "user2",
            "name": "name2"
        },
        "likes": 2
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }