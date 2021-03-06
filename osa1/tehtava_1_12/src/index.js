import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            points: [0, 0, 0, 0, 0, 0],
            selected: 0,
            mostPoints: 0
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    setSelected(target) {
        this.setState({ selected: target })
    }
    voteCurrent(target) {
        const copy = this.state.points
        copy[target] += 1
        this.setState({ points: copy })
        if (this.state.points[target] > this.state.points[this.state.mostPoints]) this.setState({ mostPoints: target })
    }
    render() {
        return (
            <div>
                <div>{this.props.anecdotes[this.state.selected]}</div>
                <div>has {this.state.points[this.state.selected]} votes</div>
                <button onClick={() => this.setSelected(this.getRandomInt(6))}>next anecdote</button>
                <button onClick={() => this.voteCurrent(this.state.selected)}>vote</button>
                <h1>anecdote with most votes:</h1>
                <div>{this.props.anecdotes[this.state.mostPoints]}</div>
                <div>has {this.state.points[this.state.mostPoints]} votes</div>
            </div >
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)