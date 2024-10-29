import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function VehiculoEdit() {
    const navigate = useNavigate();
    const { matricula } = useParams();

    const [marcas, setMarcas] = useState([]);

    const [vehiculo, setVehiculo] = useState(
        {
            marca_id: null,
            matricula: '',
            modelo: '',
            nombre: '',
            kilometraje: null,
        }
    )
    //----------------------------------------------------------------
    // useEffect para cargar las marcas al montar el componente
    //----------------------------------------------------------------
    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await fetch('http://localhost:8080/vehiculo/marcas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'authorization': sessionStorage.getItem('token'),
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setMarcas(result); // Supongamos que result es un array de objetos con { id, nombre }
                } else {
                    const errorResult = await response.json();
                    toast.error(errorResult.message, {
                        position: 'bottom-center',
                        autoClose: 5000,
                    });
                }
            } catch (error) {
                console.error('Error al traer las marcas:', error);
            }
        };

        fetchMarcas();
    }, []);


    //----------------------------------------------------------------
    // useEffect para cargar los datos del vehículo si hay una matrícula
    //----------------------------------------------------------------
    useEffect(() => {
        if (matricula) {
            const fetchVehiculo = async () => {
                try {
                    //http://localhost:8080/vehiculo/AF720ZE
                    const response = await fetch(`http://localhost:8080/vehiculo/${matricula}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'authorization': sessionStorage.getItem('token'),
                        },
                    });
                    const result = await response.json();
                    if (response.ok) {
                        setVehiculo({
                            marca_id: result.detail.marca_id,
                            matricula: result.detail.matricula,
                            modelo: result.detail.modelo,
                            nombre: result.detail.nombre,
                            kilometraje: result.detail.kilometraje,
                        });
                    } else {
                        toast.error(result.message, {
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
                    console.error(error);
                }
            };

            fetchVehiculo();
        }
    }, [matricula]);

    //----------------------------------------------------------------
    // funcion disparada al presionar el boton guardar del formulario
    //----------------------------------------------------------------
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = matricula
            ? `http://localhost:8080/vehiculo/${matricula}`
            : 'http://localhost:8080/vehiculo';
        const method = matricula ? 'PUT' : 'POST';

        const parametros = {
            method: method,
            body: JSON.stringify(vehiculo),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            },
        }

        try {
            const response = await fetch(url, parametros);
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message, {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                navigate('/vehiculos');
            } else {
                toast.error(result.message, {
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
            toast.error(error, {
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
    };

    const handleChange = (event) => {

        setVehiculo({
            ...vehiculo,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h1>{matricula ? `Edición del Vehículo ${matricula}` : 'Alta de Vehículo'}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <select
                                className="form-select"
                                id="marca"
                                aria-label="Default select example"
                                onChange={handleChange}
                                value={vehiculo.marca_id || ''}
                                name="marca_id"
                            >
                                <option disabled value="">Seleccione una Marca</option>
                                {marcas.map((marca) => (
                                    <option key={marca.marca_id} value={marca.marca_id}>
                                        {marca.nombre}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="modelo"
                                    placeholder="Modelo (ej: 2024)"
                                    onChange={handleChange}
                                    value={vehiculo.modelo}
                                    name="modelo"
                                />
                                <label htmlFor="modelo">Modelo</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    placeholder="Nombre del vehiculo (ej: Fox Trendline)"
                                    onChange={handleChange}
                                    value={vehiculo.nombre}
                                    name="nombre"
                                />
                                <label htmlFor="nombre">Nombre</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="matricula"
                                    placeholder="Matricula"
                                    onChange={handleChange}
                                    value={vehiculo.matricula}
                                    name="matricula"
                                />
                                <label htmlFor="matricula">Matrícula</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="kilometraje"
                                    placeholder="Ingrese los quilometros de su vehiculo"
                                    onChange={handleChange}
                                    value={vehiculo.kilometraje}
                                    name="kilometraje"
                                />
                                <label htmlFor="kilometraje">Kilometros</label>
                            </div>
                            <br />
                            <input className="btn btn-primary" type="submit" value="Guardar" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
