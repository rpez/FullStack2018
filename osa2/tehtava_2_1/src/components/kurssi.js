import React from 'react'
import Otsikko from './otsikko'
import Sisalto from './sisalto'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            <Sisalto sisalto={kurssi.osat} />
        </div>
    )
}

export default Kurssi