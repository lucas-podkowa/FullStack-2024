import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {

    //onSubmit --> atrapa los datos del formulario
    //onChange --> attrapa los datos del elemento donde lo tengo declarado
    //e --> objeto que nos devuelve el evento onChange
    //e.target.value --> valor del elemento que esta disparando el evento

    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');



    const submitHandler = async (e) => {
        e.preventDefault();

        const usuario = {
            mail: mail,
            pass: pass
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
                toast.success(`Bienvenido ${body.datos.nombre}`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                navigate("/vehiculos");
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


        // console.log(`el usuario es ${mail} y la contaseña es ${pass}`);

        // recien ahora podemos hacer un fech al backend, enviarles estos datos
        // por ejemplo a http://localhost:8080/login
        // una vez que tengamos la confirmacion pasamos a hacer un navigate() al dashboard

        // sintaxis fetch: fetch("url", {parametros});

    }


    return (
        <section className='section_login'>
            <h3 className='titulo_login'>Ingresa a tu cuenta</h3>
            <form
                onSubmit={submitHandler}
                className="container_login">
                <div>
                    <label className='label_login'>Usuario o email</label>
                    <input
                        onChange={(e) => setMail(e.target.value)}
                        className='input_login'
                        type="text" />
                </div>
                <div>
                    <label
                        className='label_login'>Contraseña
                    </label>
                    <input
                        onChange={(e) => setPass(e.target.value)}
                        className='input_login'
                        value={pass}
                        type="password" />
                </div>
                <div className="div_btn">
                    <input className='btn_login' type="submit" />
                </div>
            </form>
        </section>

    )
}
