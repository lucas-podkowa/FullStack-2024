import React, { useEffect } from 'react'
import { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Vehiculos() {

    const [vehiculos, setVehiculos] = useState([]);

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
                    toast.error(body.message, {
                        position: 'bottom-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            } catch (error) {
                toast.error(error.message, {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        }
        obtenerDatos();
    },
        []
    );

    return (
        <>

            {vehiculos.length > 0 ?
                (
                    vehiculos.map((vehiculo, index) => (
                        <div key={index}>
                            <h3>{vehiculo.nombre} {vehiculo.modelo}</h3>
                            <p>{vehiculo.matricula}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay vehículos disponibles.</p>
                )}
        </>
    )
}







