
export function CardDoctor({ nombre, especialidad, urlImagen }) {

    return (

        <div class="card">
            <img src={urlImagen} />
            <h3>{nombre}</h3>
            <p>Especialidad: {especialidad}</p>
            <button>Reservar Turno</button>
        </div>

    )
}