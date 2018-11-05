import React from 'react'
import personService from '../services/persons'

const Person = ({ props }) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.number}</td>
            <td><button onClick={() => personService.deleteID(props)}>poista</button></td>
        </tr>
    )
}

export default Person