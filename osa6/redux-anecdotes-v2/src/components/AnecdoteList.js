import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify, empty } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handeleVote = (anecdote) => {
    this.props.voting(anecdote.id)
    this.props.notify(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.empty('')
    }, 5000)
  }
  render() {
    const { anecdotes, filter } = this.props
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.sort((a, b) => b.votes - a.votes).filter(x => x.content.includes(filter)).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voting, notify, empty }
)(AnecdoteList)


export default ConnectedAnecdoteList
