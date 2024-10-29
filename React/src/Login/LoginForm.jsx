import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from 'react-hook-form';


export default function LoginForm() {


    // esto es la configuracion de como se vera el cartelito del tostify
    const confToast = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    }

    const navigate = useNavigate();


    // este hook manejara todo nueestro formulario, ahora no necesitamos mas un useState para cada uno de los campos
    // con formState optenemos todos los values de cada componente, eso hace que al utilizar la funcion handleSubmit, uno de los valoes
    // que puede recibir son los propios datos del formulario
    const { register, handleSubmit, formState: { errors }, watch } = useForm();


    // aca en async "(datos)" tenemos lo que debemos mandar al backen, con la diferencia de que ya estan todos validados
    // ya se encuientran validados porque han superado las reglas de validacion puestos en cada submit al registrar ese input
    const onSubmit = handleSubmit(async (datos) => {

        const usuario = {
            mail: datos.mail,
            pass: datos.pass
        };

        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(usuario)
        }

        const url = "http://localhost:8080/security/login";

        try {
            const res = await fetch(url, parametros);
            const body = await res.json();

            if (res.ok) {
                sessionStorage.setItem('token', body.token);
                toast.success(`Bienvenido ${body.datos.nombre}`, confToast);
                navigate("/vehiculos");
            } else {
                toast.error(body.message, confToast);
            }
        } catch (error) {
            toast.error(error.message, confToast);
        }

    })



    return (
        <section className='section_login'>
            <h3 className='titulo_login'>Ingresa a tu cuenta</h3>
            <form
                onSubmit={onSubmit}
                className="container_login">
                <div>
                    <label className='label_login'>Usuario o email</label>
                    <input
                        className='input_login'
                        type="email"

                        //con ...register hacemos seguimiento de este input, tanto para tenerlos en los datos del handleSubmit
                        // como para hacer directamente las validaciones pertinentes
                        {...register('mail', {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })}
                    />

                    {/* en esta seccion mostramos un pequeño cartel en tiempo real si es que existen errores en ese campo */}
                    {errors.mail?.type === 'required' && (
                        <div className="alert alert-danger mt-2" role="alert">
                            Mail es requerido
                        </div>
                    )}

                </div>
                <div>
                    <label
                        className='label_login'>Contraseña
                    </label>
                    <input
                        // onChange={(e) => setPass(e.target.value)}
                        className='input_login'
                        type="password"

                        //registro de pass con sus reglas de validacion
                        {...register('pass', {
                            required: {
                                value: true,
                                message: 'Contraseña es requerida'
                            },
                            minLength: {
                                value: 2,
                                message: 'La contraseña debe tener al menos 8 caracteres'
                            },
                            maxLength: {
                                value: 16,
                                message: 'La contraseña debe tener al menos 16 caracteres'
                            }
                        })}

                    />
                    {errors.pass && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {errors.pass.message}
                        </div>
                    )}
                </div>
                <div className="div_btn">
                    <input className='btn_login' type="submit" />
                </div>
            </form>


            {/* esto no es necesario pero lo podemos utilizar para ver los datos que estaremos mandando al backend */}
            <pre>
                {JSON.stringify(watch('pass'), null, 2)}
            </pre>

        </section >

    )
}
