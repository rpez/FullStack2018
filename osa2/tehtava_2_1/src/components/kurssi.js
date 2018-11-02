import React from 'react'
import Otsikko from './otsikko'
import Sisalto from './sisalto'
import Yhteensa from './yhteensa'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            <Sisalto sisalto={kurssi.osat} />
            <Yhteensa yhteensa={kurssi.osat} />
        </div>
    )
}

export default Kurssi