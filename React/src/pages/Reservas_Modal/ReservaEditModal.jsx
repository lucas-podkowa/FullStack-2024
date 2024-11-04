import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';

const ReservaEditModal = (reserva, show, handleClose, onSubmitSuccess) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: reserva || {}
    });


    // Variables de estado para almacenar las listas de vehículos y responsables
    const [vehiculos, setVehiculos] = useState([]);
    const [responsables, setResponsables] = useState([]);

    // llamamos por unica vez al backend para cargar los estados anteriores
    useEffect(() => {
        const getVehiculos = async (parametros) => {

            try {
                const response = await axios.get('http://localhost:8080/vehiculo', parametros);
                setVehiculos(response.data);
            } catch (error) {
                console.error("Error al cargar vehículos:", error);
            }
        };

        const getResponsables = async (parametros) => {
            try {
                const response = await axios.get('http://localhost:8080/persona', parametros);
                setResponsables(response.data);
            } catch (error) {
                console.error("Error al cargar responsables:", error);
            }
        };


        const parametros = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': sessionStorage.getItem('token'),
            }
        }

        getVehiculos(parametros);
        getResponsables(parametros);
    }, []);


    // Si estamos editando una reserva, pre-cargar los valores del formulario
    useEffect(() => {
        if (reserva) {
            setValue("vehiculo", reserva.vehiculo);
            setValue("responsable", reserva.responsable);
            setValue("desde", reserva.desde);
            setValue("hasta", reserva.hasta);
            setValue("finalizada", reserva.finalizada);
            setValue("cancelada", reserva.cancelada);
        }
    }, [reserva, setValue]);

    const onFormSubmit = async (data) => {
        try {
            if (reserva) { // si existe el parametro reserva es un update, de lo contrario un create
                await axios.put(`/reserva/${reserva.reserva_id}`, data);
            } else {
                await axios.post('/reserva', data);
            }
            onSubmitSuccess(response.data);
            handleClose();
        } catch (error) {
            console.error("Error al guardar la reserva:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crear o Editar Reserva</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="vehiculo">
                                <Form.Label>Vehículo</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("vehiculo",
                                        { required: "Seleccione un vehículo" })
                                    }
                                    isInvalid={!!errors.vehiculo}
                                >
                                    <option value="">Seleccione un vehículo</option>
                                    {vehiculos.map((vehiculo) => (
                                        <option key={vehiculo.matricula} value={vehiculo.matricula}>
                                            {vehiculo.nombre} - {vehiculo.modelo}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.vehiculo?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="responsable">
                                <Form.Label>Responsable</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("responsable",
                                        { required: "Seleccione un responsable" })
                                    }
                                    isInvalid={!!errors.responsable}
                                >
                                    <option value="">Seleccione un responsable</option>
                                    {responsables.map((persona) => (
                                        <option key={persona.dni} value={persona.dni}>
                                            {persona.nombre} {persona.apellido}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.responsable?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="desde">
                                <Form.Label>Desde</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    {...register("desde", { required: "El campo Desde es obligatorio" })}
                                    isInvalid={!!errors.desde}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.desde?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="hasta">
                                <Form.Label>Hasta</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    {...register("hasta")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* <Form.Group controlId="finalizada" className="mt-3">
                <Form.Check
                    type="checkbox"
                    label="Finalizada"
                    {...register("finalizada")}
                />
            </Form.Group>

            <Form.Group controlId="cancelada" className="mt-3">
                <Form.Check
                    type="checkbox"
                    label="Cancelada"
                    {...register("cancelada")}
                />
            </Form.Group> */}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button type="submit" variant="primary" className="mt-3">
                        {reserva ? "Guardar cambios" : "Crear reserva"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReservaEditModal;
