import React from 'react'

const Person = ({ props }) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.number}</td>
        </tr>
    )
}

export default Person