import { CardDoctor } from './CardDoctor'

export default function ListaDoctores() {

    const doctores = [
        { nombre: "Pepe", especialidad: 'Pediatra', img: 'https://robohash.org/doc1' },
        { nombre: "pedro", especialidad: 'Cirujano', img: 'https://robohash.org/doc2' },
        { nombre: "Pipo", especialidad: 'Oncologo', img: 'https://robohash.org/doc3' }
    ];

    return (
        <section id="medicos">
            <h2>Médicos Disponibles</h2>
            <div className="card-container">
                {doctores.map((d) => (<CardDoctor nombre={d.nombre} especialidad={d.especialidad} urlImagen={d.img} />))}
            </div>

        </section>
    )
}







