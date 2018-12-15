import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify, empty } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handeleVote = (anecdote) => {
    this.props.store.dispatch(voting(anecdote.id))
    this.props.store.dispatch(notify(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      this.props.store.dispatch(empty(''))
    }, 5000)
  }
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handeleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}



export default AnecdoteList
