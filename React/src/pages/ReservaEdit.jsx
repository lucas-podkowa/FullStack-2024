import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ReservaEdit = () => {
    const { reserva } = useParams();
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

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
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


        const parametros = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }

        try {
            if (reserva) { // si existe el parametro reserva es un update, de lo contrario un create
                const response = await axios.put(`http://localhost:8080/reserva/${reserva.reserva_id}`, data, parametros);
            } else {
                const response = await axios.post('http://localhost:8080/reserva', data, parametros);
            }
            toast.success(data.message, configToast);
            navigate('/reservas');
        } catch (error) {
            console.error("Error al guardar la reserva:", error);
        }
    };

    const handleClose = () => {
        reset();
        navigate('/reservas');
    };


    return (
        <Form onSubmit={handleSubmit(onFormSubmit)} className='mt-4 p-2'>
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
            <Form.Group className='d-flex justify-content-end gap-4'>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>

                <Button type="submit" variant="primary">
                    {reserva ? "Guardar cambios" : "Crear reserva"}
                </Button>

            </Form.Group>

        </Form>
    );
};

export default ReservaEdit;
