import React from 'react'

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            rajaa näytettäviä <input
                value={filter}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter