import React from 'react';
import Country from './components/country'
import Filter from './components/filter'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }
    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }
    showList = () => {
        const filtered = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        if (filtered.length >= 10) {
            return <div>too many matches, specify another filter</div>
        }
        else if (filtered.length <= 0) return <div>no matches</div>
        else if (filtered.length === 1) return filtered.map(country => <Country key={country.numericCode} props={country} showDetails={true} />)
        else {
            return (
                <table>
                    <tbody>
                        {filtered.map(country => <Country key={country.numericCode} props={country} />)}
                    </tbody>
                </table>)
        }
    }
    render() {
        return (
            <div>
                <Filter text='find countries' filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
                <this.showList />
            </div>
        )
    }
}

export default App