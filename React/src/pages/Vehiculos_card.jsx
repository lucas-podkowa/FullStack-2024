import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehiculosCard = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [modal, setModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        async function obtenerDatos() {
            try {
                const parametros = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token'),
                    },
                };

                const url = "http://localhost:8080/vehiculo";

                const response = await fetch(url, parametros);
                const body = await response.json();

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
                        theme: 'light',
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        obtenerDatos();
    }, []);

    const closeModal = () => {
        setModal(false);
        setIdToDelete(null);
    };

    const showModal = (vehiculoId) => {
        setModal(true);
        setIdToDelete(vehiculoId);
    };

    const handleClickDelete = async () => {
        const parametros = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        const url = `http://localhost:8080/vehiculo/${idToDelete}`;

        try {
            const response = await fetch(url, parametros);
            const body = await response.json();

            if (response.ok) {
                toast.success(body.message, {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });

                // Refrescar los vehiculos
                setVehiculos((prevVehiculos) =>
                    prevVehiculos.filter((vehiculo) => vehiculo.vehiculo_id !== idToDelete)
                );
                closeModal();
            } else {
                toast.error(body.message, {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'light',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
    // const rol = tokenDecoded.rol;

    return (
        <>
            <div className="d-flex flex-wrap justify-content-start">
                {vehiculos.map((vehiculo, index) => (
                    <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body>
                            <Card.Title>{vehiculo.nombre}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{vehiculo.matricula}</Card.Subtitle>
                            <Card.Text>Modelo: {vehiculo.modelo}</Card.Text>
                            {/* aca podria agregar la marca */}
                            <div className="d-flex justify-content-between align-items-baseline">
                                <Button as={Link} to={`/vehiculo/edit/${vehiculo.matricula}`} variant="primary">
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => showModal(vehiculo.vehiculo_id)}>
                                    Eliminar
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* {rol === 'Administrador' && (
                <Link to={`/vehiculo/crear/`} className='btn btn-primary'>
                    <span class="material-symbols-outlined">Crear</span>
                </Link>
            )} */}

            <Link to={`/vehiculo/crear/`} className='btn btn-primary'>
                <span class="material-symbols-outlined">Crear</span>
            </Link>

            <Modal show={modal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de eliminar el vehículo seleccionado?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleClickDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VehiculosCard;
