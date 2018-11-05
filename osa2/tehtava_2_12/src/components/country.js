import React from 'react'

const Country = ({ props, showDetails = false }) => {
    if (!showDetails) {
        return (
            <tr>
                <td>{props.name}</td>
            </tr>
        )
    }
    else {
        return (
            <div>
                <h1>
                    {props.name} {props.nativeName}
                </h1>
                <div>capital: {props.capital}</div>
                <div>population: {props.population}</div>
                <img src={props.flag} alt='flag'></img>
            </div>
        )
    }
}

export default Country