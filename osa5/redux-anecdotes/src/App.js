import React from 'react';
import actionFor from './ActionCreator'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: ''
    }
    this.store = this.props.store
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.store.dispatch(
      actionFor.anecdoteCreation(event.target.newAnecdote.value)
    )
    event.target.newAnecdote.value = ''
    this.setState({
      newAnecdote: ''
    })
  }
  vote = (id) => () => {
    this.store.dispatch(
      actionFor.anecdoteVoting(id)
    )
  }


  render() {
    const anecdotes = this.store.getState()
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
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div>
            <input
              type="text"
              name="newAnecdote"
              value={this.state.newAnecdote}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App