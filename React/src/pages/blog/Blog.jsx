import React from 'react'
import './style.css'
import Articulo from './Articulo'


export default function Blog() {
    return (
        <>
            <header className='header'>
                <h1>Blog de Comsión A</h1>
            </header>
            <section className="section">
                <Articulo />
                <Articulo />
            </section>
            <footer className='footer'>
                <section>
                    <a href="#titulo">Ir al comienzo</a>
                    <a href="mailto:silicon@gmail.com">Contáctame aquí</a>
                </section>
                <p>Copyright 2023</p>
            </footer>
        </>
    )
}
