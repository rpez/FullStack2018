import React from 'react'

const Filter = ({ text, filter, handleFilterChange }) => {
    return (
        <div>
            {text} <input
                value={filter}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter