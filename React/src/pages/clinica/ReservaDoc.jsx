import React from 'react'

export default function ReservaDoc() {
    return (
        <>
            <div id="formulario-modal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="cerrarFormulario()">&times;</span>
                    <h2>Reservar Turno</h2>
                    <form id="reserva-form">
                        <p id="info-medico"></p>
                        <label for="nombre">Tu nombre:</label>
                        <input type="text" id="nombre" name="nombre" required />

                        <label for="fecha">Fecha del turno:</label>
                        <input type="date" id="fecha" name="fecha" required />

                        <button type="submit">Confirmar Turno</button>
                    </form>
                </div>
            </div>
        </>
    )
}
