import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function VehiculoEdit() {


    const navigate = useNavigate();
    const configToast = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    }

    // parametro que recibe cuando el componente Vehiculos_card preciona el boton editar activando el link
    // to={`/vehiculo/edit/${vehiculo.matricula}`}
    const { matricula } = useParams();


    // hooks dedicados a cargar las marcas y a setear los datos del vehiculo al cargarse
    //----------------------------------------------------------------
    const [marcas, setMarcas] = useState([]);
    const [vehiculo, setVehiculo] = useState(
        {
            marca_id: '',
            matricula: '',
            modelo: '',
            nombre: '',
            kilometraje: '',
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

    /*
                                <Link to={`/reservas/crear/`} className='btn btn-primary'>
                                    <span className="material-symbols-outlined">Nueva Reserva</span>
                                </Link>
    */

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
                        toast.error(result.message, configToast);
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

        // Usamos FormData para manejar datos y archivos
        const formData = new FormData()

        // Agregar los datos del vehículo a FormData
        Object.keys(vehiculo).forEach((key) => {
            if (key === 'imagenes') {
                // Si es la clave 'imagenes', agregamos cada archivo individualmente
                vehiculo.imagenes.forEach((file) => formData.append('imagenes', file));
            } else {
                formData.append(key, vehiculo[key]);
            }
        });

        const parametros = {
            method: method,
            body: formData,
            headers: {
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            },
        }
        try {
            const response = await fetch(url, parametros);
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message, configToast);
                navigate('/vehiculos');
            } else {
                toast.error(result.message, configToast);
            }
        } catch (error) {
            toast.error(error.message, configToast);
        }
    };
    //----------------------------------------------------------------


    // hooks dedicados a abrir el modal de eliminacion y setear el ID a eliminar
    //----------------------------------------------------------------
    const [showModal, setShowModal] = useState(false);
    //----------------------------------------------------------------

    const handleDelete = () => {
        setShowModal(true);
    };

    // funcion disparada al presionar el boton eiminar 
    //----------------------------------------------------------------
    const confirmDelete = async () => {
        setShowModal(false);
        const parametros = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            },
        };

        const url = `http://localhost:8080/vehiculo/${matricula}`;

        try {
            const response = await fetch(url, parametros);
            const body = await response.json();
            if (response.ok) {
                toast.success(body.message, configToast);
                navigate('/vehiculos'); // Redirige después de eliminar
            }
        } catch (error) {
            toast.error(error.message, configToast);
        }
    };

    //----------------------------------------------------------------


    // funcion que queda escuchando los campos en el formulario para setear
    // en la variable de estado vehiculo
    //----------------------------------------------------------------
    const handleChange = (e) => {
        setVehiculo({
            ...vehiculo,
            [e.target.name]: e.target.value,
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
                                    id="modelo"
                                    placeholder="Modelo (ej: 2024)"
                                    onChange={handleChange}
                                    value={vehiculo.modelo}
                                    name="modelo"
                                />
                                <label htmlFor="modelo">Modelo / Año</label>
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
                            <div className='row'>
                                <div className='col d-flex justify-content-end gap-4'>
                                    <span className="btn btn-primary" type="submit"
                                        onClick={handleSubmit}>
                                        Guardar
                                    </span>
                                    <span className="btn btn-secondary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/vehiculos');
                                        }}>
                                        Cancelar
                                    </span>
                                    <span className='btn btn-danger'
                                        onClick={handleDelete}>
                                        Eliminar
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ConfirmModal
                show={showModal}
                onConfirm={confirmDelete}
                onCancel={() => setShowModal(false)}
            />
        </>
    );
}


function ConfirmModal({ show, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>¿Estás seguro de que deseas eliminar este vehículo?</h4>
                <button onClick={onConfirm} className="btn btn-info">Confirmar</button>
                <button onClick={onCancel} className="btn btn-danger">Cancelar</button>
            </div>
        </div>
    );
}
