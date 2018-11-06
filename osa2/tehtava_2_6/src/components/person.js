import React from 'react'

const Person = ({ props, deleteName }) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.number}</td>
            <td><button onClick={() => deleteName(props.id)}>poista</button></td>
        </tr>
    )
}

export default Person