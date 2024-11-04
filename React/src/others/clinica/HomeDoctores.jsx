import React from 'react'
import '/src/css/estilo.css'
import ListaDoctores from './ListaDoctores'

export default function HomeDoctores() {
    return (
        <>

            <header>
                <h1>Clínica Salud</h1>
                <p>Reserva tu turno con nuestros profesionales</p>
            </header>

            <ListaDoctores />
        </>
    )
}
