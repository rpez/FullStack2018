import React from 'react';

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
    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }
    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
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
    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    rajaa näytettäviä <input
                        value={this.state.filter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                        numero: <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase())).map(person =>
                            <tr key={person.name}>
                                <td>{person.name}</td>
                                <td>{person.number}</td>
                            </tr>)}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default App