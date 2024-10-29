import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [modal, setModal] = useState(false);
    const [reserva_id, setReserva_id] = useState(null);

    const configTosti = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const fetchReservas = async () => {
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
                setReservas(body);
            } else {
                toast.error(body.message, configTosti);
            }
        } catch (error) {
            toast.error(error.message, configTosti);
        }



    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleClickCancelar = () => {
        const parametros = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`http://localhost:8080/reserva/cancelar/${reserva_id}`, parametros)
            .then(res => res.json().then(body => ({ status: res.status, ok: res.ok, body })))
            .then(result => {
                if (result.ok) {
                    toast.success(result.body.message, configTosti);
                    fetchReservas();
                    setModal(false);
                } else {
                    toast.error(result.body.message, configTosti);
                }
            })
            .catch(error => console.error(error));
    };

    const handleClickFinalizar = (reserva_id) => {
        const parametros = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`http://localhost:8080/reserva/finalizar/${reserva_id}`, parametros)
            .then(res => res.json().then(body => ({ status: res.status, ok: res.ok, body })))
            .then(result => {
                if (result.ok) {
                    toast.success(result.body.message, configTosti);
                    fetchReservas();
                } else {
                    toast.error(result.body.message, configTosti);
                }
            })
            .catch(error => console.error(error));
    };

    const closeModal = () => {
        setModal(false);
        setReserva_id(null);
    };

    const showModal = (reserva_id) => {
        setModal(true);
        setReserva_id(reserva_id);
    };

    const convertirFecha = (date) => {
        const fecha = new Date(date);
        const dia = fecha.getUTCDate().toString().padStart(2, '0');
        const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getUTCFullYear();
        return `${dia}/${mes}/${anio}`;
    };

    const filas = reservas.map((reserva, index) => {
        return (
            <tr key={index}>
                <td>{reserva.responsable}</td>
                <td>{reserva.vehiculo}</td>
                <td>{convertirFecha(reserva.desde)}</td>
                <td>{convertirFecha(reserva.hasta)}</td>
                <td>
                    <Link to={`/reservas/edit/${reserva.reserva_id}`} className='btn btn-outline-primary btn-sm'>
                        <span className="material-symbols-outlined">edit</span>
                    </Link>
                    <button className='btn btn-outline-danger btn-sm' onClick={() => showModal(reserva.reserva_id)}>
                        <span className="material-symbols-outlined">cancel</span>
                    </button>
                    <button className='btn btn-outline-success btn-sm' onClick={() => handleClickFinalizar(reserva.reserva_id)}>
                        <span className="material-symbols-outlined">no_crash</span>
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div>
                <table className='table  table-striped'>
                    <thead>
                        <tr>
                            <th>Vehiculo</th>
                            <th>Responsable</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>{filas}</tbody>
                </table>
                <br />
                <Link to="/reservas/edit" className='btn btn-info'>Nueva Reserva</Link>
            </div>

            <Modal show={modal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancelación de Reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro/a de cancelar la reserva seleccionada?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeModal}>Volver</Button>
                    <Button variant="primary" onClick={handleClickCancelar}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Reservas;
