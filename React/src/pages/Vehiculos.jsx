import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Vehiculos() {

    const [vehiculos, setVehiculos] = useState([]);

    const toastConf = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    }

    useEffect(() => {

        async function obtenerDatos() {
            try {
                const parametros = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token')
                    }
                }
                const url = "http://localhost:8080/vehiculo";

                let response = await fetch(url, parametros)
                let body = await response.json();

                if (response.ok) {
                    setVehiculos(body);
                } else {
                    toast.error(body.message, toastConf);
                }
            } catch (error) {
                toast.error(error.message, toastConf);
            }
        }
        obtenerDatos();
    },
        []
    );


    const filas = vehiculos.map((vehiculo, index) => {
        return (
            <tr key={index}>
                <td>{vehiculo.matricula}</td>
                <td>{vehiculo.nombre}</td>
                <td>{vehiculo.modelo}</td>
                <td>
                    <Link to={`/vehiculo/edit/${vehiculo.matricula}`} className='btn btn-primary'>
                        <span className="material-symbols-outlined">editar</span>
                    </Link>

                    {/* <button className='btn btn-danger' onClick={() => showModal(vehiculo.vehiculo_id)}>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button> */}
                </td>
            </tr>
        )

    });




    return (
        <>
            <div>

                <Link to={`/vehiculo/crear/`} className='btn btn-primary'>
                    <span className="material-symbols-outlined">Crear</span>
                </Link>

            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nombre</th>
                        <th>Modelo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No hay vehiculos registrados.</td>
                        </tr>
                    ) : (
                        filas
                    )}
                </tbody>
            </table>

        </>
    )
}





// {vehiculos.length > 0 ?
//     (
//         vehiculos.map((vehiculo, index) => (
//             <div key={index}>
//                 <h3>{vehiculo.nombre} {vehiculo.modelo}</h3>
//                 <p>{vehiculo.matricula}</p>
//             </div>
//         ))
//     ) : (
//         <p>No hay vehículos disponibles.</p>
//     )}

