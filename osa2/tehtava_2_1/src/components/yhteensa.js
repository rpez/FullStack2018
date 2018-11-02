import React from 'react'

const Yhteensa = ({ yhteensa }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return (
    <div>yhteensä {yhteensa.map(osa => osa.tehtavia).reduce(reducer)} tehtävää</div>
  )
}

export default Yhteensa