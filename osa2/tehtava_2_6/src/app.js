import React from 'react';
import NewPerson from './components/newPerson'
import Person from './components/person'
import Filter from './components/filter'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }
    addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        if (!this.state.persons.map(person => person.name).includes(nameObject.name)) {
            const persons = this.state.persons.concat(nameObject)
            this.setState({
                persons: persons,
                newName: '',
                newNumber: ''
            })
        }
    }
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
                <h2>Lisää uusi</h2>
                <NewPerson newName={this.state.newName} newNumber={this.state.newNumber} addName={this.addName} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} />
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase())).map(person => <Person key={person.name} props={person} />)}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default App