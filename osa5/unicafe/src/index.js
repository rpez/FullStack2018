import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const Statistiikka = ({ state }) => {
  const palautteita = state.good + state.ok + state.bad
  console.log(palautteita)
  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(state.good * 1 + state.bad * -1) / palautteita}</td>
          </tr>
          <tr>
            <td>positiivisia {state.good / palautteita} %</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => {
    return () => {
      switch (nappi) {
        case 'GOOD':
          return store.dispatch({ type: 'GOOD' })
        case 'OK':
          return store.dispatch({ type: 'OK' })
        case 'BAD':
          return store.dispatch({ type: 'BAD' })
        case 'ZERO':
          return store.dispatch({ type: 'ZERO' })
        default:
          return store.dispatch({ type: '' })
      }
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka state={store.getState()} />
        <button onClick={this.klik('ZERO')}>nollaa tilasto</button>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)