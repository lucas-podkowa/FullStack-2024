import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import editIcon from './../images/icos/edit.png';
import cancelIcon from './../images/icos/cancel.png';
import finishIcon from './../images/icos/finish.png';
import ReservaEditModal from './ReservaEditModal';


const ReservasModal = () => {
    const [reservasFinalizadas, setReservasFinalizadas] = useState([]);
    const [reservasActivas, setReservasAtivas] = useState([]);

    const [showModal, setShowModal] = useState(false);
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

                // Filtrar reservas finalizadas
                const reservasFinalizadas = body.detail.filter(reserva => reserva.finalizada == true || reserva.finalizada == 1);
                setReservasFinalizadas(reservasFinalizadas);

                // Filtrar reservas no finalizadas
                const reservasActivas = body.detail.filter(reserva => reserva.finalizada == false || reserva.finalizada == 0);
                setReservasAtivas(reservasActivas);

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



    const handleShowModal = (reserva = null) => {
        setReservaToEdit(reserva);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReservaToEdit(null);
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
            setIdToCancel(null);  // Restablecer idToCancel después de cancelar
            getReservas();
        } catch (error) {
            console.error('Error cancelando reserva:', error);
            toast.error('Error cancelando reserva');
        }
    };

    const handleSubmitSuccess = () => {
        // Aquí puedes actualizar el listado de reservas después de crear o editar
        console.log("Reserva creada/editada con éxito");
        handleCloseModal();
    };

    return (
        <>

            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Reservas Activas
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <Button variant="primary" onClick={() => handleShowModal()}>Nueva Reserva</Button>

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Vehículo</th>
                                        <th>Responsable</th>
                                        <th>Desde</th>
                                        <th>Hasta</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservasActivas.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay reservas activas.</td>
                                        </tr>
                                    ) : (
                                        reservasActivas.map(reserva => (
                                            <tr key={reserva.reserva_id}>
                                                <td>{reserva.vehiculo}</td>
                                                <td>{reserva.responsable}</td>
                                                <td>{new Date(reserva.desde).toLocaleString()}</td>
                                                <td>{new Date(reserva.hasta).toLocaleString()}</td>
                                                <td>

                                                    <Button variant="outline-primary"
                                                        onClick={() => handleShowModal(reserva)}>
                                                        <img src={editIcon} alt="Editar" />
                                                        Editar
                                                    </Button>

                                                    <Button variant="outline-danger" onClick={() => setIdToCancel(reserva.reserva_id)}>
                                                        <img src={cancelIcon} alt="Cancelar" />
                                                        Cancelar
                                                    </Button>
                                                    <Button variant="outline-success" onClick={() => handleFinalizar(reserva.reserva_id)}>
                                                        <img src={finishIcon} alt="Finalizar" />
                                                        Finalizar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            {/* Renderiza el modal de ReservaEdit solo si showModal es true */}
                            {showModal && (
                                <ReservaEditModal
                                    reserva={reservaToEdit}
                                    show={showModal}
                                    handleClose={handleCloseModal}
                                    onSubmitSuccess={handleSubmitSuccess}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Reservas Finalizadas
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Vehículo</th>
                                        <th>Responsable</th>
                                        <th>Desde</th>
                                        <th>Hasta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservasFinalizadas.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay reservas Finalizadas</td>
                                        </tr>
                                    ) : (
                                        reservasFinalizadas.map(reserva => (
                                            <tr key={reserva.reserva_id}>
                                                <td>{reserva.vehiculo}</td>
                                                <td>{reserva.responsable}</td>
                                                <td>{new Date(reserva.desde).toLocaleString()}</td>
                                                <td>{new Date(reserva.hasta).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>





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

export default ReservasModal;
