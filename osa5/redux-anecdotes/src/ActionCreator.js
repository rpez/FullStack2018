const actionFor = {
    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: content
        }
    },
    anecdoteVoting(id) {
        return {
            type: 'VOTE',
            id: id
        }
    }
}

export default actionFor