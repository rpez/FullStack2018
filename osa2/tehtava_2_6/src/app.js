import React from 'react';
import NewPerson from './components/newPerson'
import Person from './components/person'
import Filter from './components/filter'
import personService from './services/persons'
import Notification from './components/notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            message: null
        }
    }
    componentDidMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
    }
    addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: this.state.newName,
            number: this.state.newNumber,
            id: this.state.persons.length + 1
        }
        if (!this.state.persons.map(person => person.name).includes(nameObject.name)) {
            const persons = this.state.persons.concat(nameObject)
            personService
                .create(nameObject)
                .then(response => {
                    this.setState({
                        persons: persons,
                        newName: '',
                        newNumber: '',
                        message: `lisättiin ${nameObject.name}`
                    })
                    setTimeout(() => {
                        this.setState({ message: null })
                    }, 2000)
                })
                .catch(error => {
                    alert(`henkilön '${nameObject.name}' lisääminen ei onnistunut`)
                })
        }
        else {
            const nameObject = {
                name: this.state.newName,
                number: this.state.newNumber,
                id: this.state.persons.find(n => n.name === this.state.newName).id
            }
            this.updateNumber(nameObject)
        }
    }
    deleteName = (id) => {
        const nameObject = this.state.persons.find(person => person.id === id)
        personService
            .deleteID(nameObject)
            .then(response => {
                this.setState({
                    persons: this.state.persons.filter(person => person.id !== id),
                    newName: '',
                    newNumber: '',
                    message: `poistettiin ${nameObject.name}`
                })
                setTimeout(() => {
                    this.setState({ message: null })
                }, 2000)
            })
            .catch(error => {
                alert(`henkilö '${nameObject.name}' on jo valitettavasti poistettu palvelimelta`)
                this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
            })

    }
    updateNumber = (newPerson) => {
        const person = this.state.persons.find(n => n.id === newPerson.id)
        const changedPerson = { ...person, number: newPerson.number }
        personService
            .update(newPerson.id, changedPerson)
            .then(changedPerson => {
                const persons = this.state.persons.filter(n => n.id !== newPerson.id)
                this.setState({
                    persons: persons.concat(changedPerson),
                    message: `muokattiin numeroa henkilöltä ${changedPerson.name}`
                })
                setTimeout(() => {
                    this.setState({ message: null })
                }, 2000)
            })
            .catch(error => {
                personService
                .create(changedPerson)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(n => n.id !== newPerson.id).concat(changedPerson),
                        newName: '',
                        newNumber: '',
                        message: `lisättiin ${changedPerson.name}`
                    })
                    setTimeout(() => {
                        this.setState({ message: null })
                    }, 2000)
                })
            })
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
                <Notification message={this.state.message} />
                <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
                <h2>Lisää uusi</h2>
                <NewPerson newName={this.state.newName} newNumber={this.state.newNumber} addName={this.addName} handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} />
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase())).map(person => <Person key={person.id} props={person} deleteName={this.deleteName} />)}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default App