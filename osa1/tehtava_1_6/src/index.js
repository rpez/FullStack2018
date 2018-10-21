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
            <Statistic stat={props.stats[3]} />
            <Statistic stat={props.stats[4]} />
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
            badCount: 0,
            valuesNotGiven: true
        }
        this.addGood = this.addGood.bind(this)
        this.addNeurtal = this.addNeurtal.bind(this)
        this.addBad = this.addBad.bind(this)
    }
    addGood = () => {
        this.setState({ 
            goodCount: this.state.goodCount + 1,
            valuesNotGiven: false
        })
    }
    addNeurtal = () => {
        this.setState({
            neutralCount: this.state.neutralCount + 1,
            valuesNotGiven: false
        })
    }
    addBad = () => {
        this.setState({
            badCount: this.state.badCount + 1,
            valuesNotGiven: false
        })
    }
    values = (feedback, valuesNotGiven) => {
        console.log(valuesNotGiven)
        if (!valuesNotGiven) {
            return (
                <Statistics stats={feedback.stats} />
            )
        }
        else {
            return (
                <div>{feedback.noStatistics}</div>
            )
        }
    }
    render() {
        const feedback = {
            title: 'anna palautetta',
            subTitle: 'statistiikka',
            noStatistics: 'ei yhtään palautetta annettu',
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
                },
                {
                    text: 'keskiarvo',
                    count: (this.state.goodCount - this.state.badCount) / (this.state.goodCount + this.state.badCount + this.state.neutralCount)
                },
                {
                    text: 'positiivisia',
                    count: this.state.goodCount / (this.state.goodCount + this.state.badCount + this.state.neutralCount) * 100 + ' %'
                }
            ],
            funcs: [
                this.addGood,
                this.addNeurtal,
                this.addBad
            ],
            valuesNotGiven: this.state.valuesNotGiven
        }
        return (
            <div>
                <Title title={feedback.title} />
                <Buttons stats={feedback.stats} funcs={feedback.funcs} />
                <Title title={feedback.subTitle} />
                {this.values(feedback, feedback.valuesNotGiven)}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)