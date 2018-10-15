import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}
const Statistics = (props) => {
    return (
        <div>
            <Statistic stat={props.stats[0]} />
            <Statistic stat={props.stats[1]} />
            <Statistic stat={props.stats[2]} />
        </div>
    )
}
const Statistic = (props) => {
    return (
        <div>
            <p>{props.stat.text} {props.stat.count}</p>
        </div>
    )
}
const Buttons = (props) => {
    return (
        <div>
            <Button stat={props.stats[0]} func={props.funcs[0]} />
            <Button stat={props.stats[1]} func={props.funcs[1]} />
            <Button stat={props.stats[2]} func={props.funcs[2]} />
        </div>
    )
}
const Button = (props) => {
    return (
        <div>
            <button onClick={props.func}>{props.stat.text}</button>
        </div>
    )
}
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            goodCount: 0,
            neutralCount: 0,
            badCount: 0
        }
        this.addGood = this.addGood.bind(this)
        this.addNeurtal = this.addNeurtal.bind(this)
        this.addBad = this.addBad.bind(this)
    }
    addGood = () => {
        this.setState({ goodCount: this.state.goodCount + 1 })
    }
    addNeurtal = () => {
        this.setState({ neutralCount: this.state.neutralCount + 1 })
    }
    addBad = () => {
        this.setState({ badCount: this.state.badCount + 1 })
    }
    render() {
        const feedback = {
            title: 'anna palautetta',
            subTitle: 'statistiikka',
            stats: [
                {
                    text: 'hyvä',
                    count: this.state.goodCount
                },
                {
                    text: 'neutraali',
                    count: this.state.neutralCount
                },
                {
                    text: 'huono',
                    count: this.state.badCount
                }
            ],
            funcs: [
                this.addGood,
                this.addNeurtal,
                this.addBad
            ]
        }
        return (
            <div>
                <Title title={feedback.title} />
                <Buttons stats={feedback.stats} funcs={feedback.funcs} />
                <Title title={feedback.subTitle} />
                <Statistics stats={feedback.stats} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)