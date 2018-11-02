import React from 'react'
import Osa from './osa'

const Sisalto = ({ sisalto }) => {
  return (
    <div>
      <Osa osa={sisalto[0].nimi} tehtavia={sisalto[0].tehtavia} />
      <Osa osa={sisalto[1].nimi} tehtavia={sisalto[1].tehtavia} />
      <Osa osa={sisalto[2].nimi} tehtavia={sisalto[2].tehtavia} />
    </div>
  )
}

export default Sisalto