import React from 'react'

const NewPerson = ({ newName, newNumber, addName, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addName}>
            <div>
                nimi: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                numero: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default NewPerson