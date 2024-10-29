// src/components/Reservas2.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

const Reservas2 = () => {
    const [reservas, setReservas] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [reservaToEdit, setReservaToEdit] = useState(null);
    const [idToCancel, setIdToCancel] = useState(null);

    const getReservas = async () => {

































































        try {
            const parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token'),
                },
            };
            const url = "http://localhost:8080/reserva";
            const result = await fetch(url, parametros);
            const body = await result.json();

            if (result.ok) {
                setReservas(body.detail);
            } else {
                toast.error(body.message, configTosti);
            }
        } catch (error) {
            toast.error(error.message, configTosti);
        }
    };

    useEffect(() => {
        getReservas();
    }, []);

    const handleEdit = (reserva) => {
        setReservaToEdit(reserva);
        setModalShow(true);
    };

    const handleFinalizar = async (reserva_id) => {
        try {
            await axios.put(`http://localhost:8080/reserva/finalizar/${reserva_id}`);
            toast.success('Reserva finalizada');
            getReservas();
        } catch (error) {
            console.error('Error finalizando reserva:', error);
            toast.error('Error finalizando reserva');
        }
    };

    const handleCancel = async () => {
        try {
            await axios.put(`http://localhost:8080/reserva/cancelar/${idToCancel}`);
            toast.success('Reserva cancelada');
            setModalShow(false);
            getReservas();
        } catch (error) {
            console.error('Error cancelando reserva:', error);
            toast.error('Error cancelando reserva');
        }
    };

    const handleCreate = () => {
        setReservaToEdit(null);
        setModalShow(true);
    };

    return (
        <>
            <h2>Reservas Activas</h2>
            <Button variant="primary" onClick={handleCreate}>Nueva Reserva</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Vehículo</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center">No hay reservas activas.</td>
                        </tr>
                    ) : (
                        reservas.map(reserva => (
                            <tr key={reserva.reserva_id}>
                                <td>{reserva.evento}</td>
                                <td>{reserva.vehiculo}</td>
                                <td>{new Date(reserva.desde).toLocaleString()}</td>
                                <td>{new Date(reserva.hasta).toLocaleString()}</td>
                                <td>
                                    <Button variant="outline-primary" onClick={() => handleEdit(reserva)}>Editar</Button>
                                    <Button variant="outline-danger" onClick={() => setIdToCancel(reserva.reserva_id)}>Cancelar</Button>
                                    <Button variant="outline-success" onClick={() => handleFinalizar(reserva.reserva_id)}>Finalizar</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{reservaToEdit ? 'Editar Reserva' : 'Nueva Reserva'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Aquí puedes agregar el formulario para editar o crear reservas */}
                    {reservaToEdit ? (
                        <div>
                            <p>Editando reserva: {reservaToEdit.reserva_id}</p>
                            {/* Agrega tu formulario aquí */}
                        </div>
                    ) : (
                        <div>
                            <p>Nueva reserva</p>
                            {/* Agrega tu formulario aquí */}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
                    <Button variant="primary" onClick={reservaToEdit ? () => { /* Lógica para editar */ } : () => { /* Lógica para crear */ }}>
                        {reservaToEdit ? 'Guardar Cambios' : 'Crear Reserva'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={idToCancel !== null} onHide={() => setIdToCancel(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cancelación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de que desea cancelar esta reserva?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIdToCancel(null)}>No</Button>
                    <Button variant="danger" onClick={handleCancel}>Sí, Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Reservas2;
