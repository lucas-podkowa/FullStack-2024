import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginHooks() {

    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');

    const [errors, setErrors] = useState({})


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

    //valida la estructura de un correo electronico
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    //valida que tenga al menos 8 caracteres, al menos 1 digito numerico y al menos 1 mayuscula
    const isValidPassword = (password) => {
        return password.length >= 8 && /\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password);
    };


    //aprovechamos el evento onBlur de los inputs para realizar las validaciones
    const handleBlur = (field) => {
        const newErrors = { ...errors };


        if (field === 'mail') {
            if (!mail) {
                newErrors.mail = 'El correo es obligatorio'; //aca cargo errores en el objeto newError
            } else if (!isValidEmail(mail)) {
                newErrors.mail = 'Por favor, ingresa un correo electrónico válido'; //aca cargo errores en el objeto newError
            } else {
                delete newErrors.mail; //si no hay errores limpio el campo mail del objeto de errors
            }
        }

        if (field === 'pass') {
            if (!pass) {
                newErrors.pass = 'La contraseña es obligatoria';
            } else if (!isValidPassword(pass)) {
                newErrors.pass = 'La contraseña debe tener al menos 8 caracteres, incluir un número y una mayúscula';
            } else {
                delete newErrors.pass;
            }
        }

        setErrors(newErrors); //seteo mi variable de estado error con su hook serError y le envio los errores generados (que puede estar vacio)
    };

    const validateForm = () => {
        handleBlur('mail');
        handleBlur('pass');
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        validateForm(); // valido el formulario antes de enviar


        if (Object.entries(errors).length > 0) {
            return;
        }
        // Verificar si hay errores antes de enviar el formulario

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
                toast.success(`Bienvenido ${body.datos.nombre}`, confToast);
                navigate("/vehiculos");
            } else {
                toast.error(body.message, confToast);
            }
        } catch (error) {
            toast.error(error.message, confToast);

        }
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
                        onBlur={() => handleBlur('mail')}
                        className='input_login'
                        type="text"

                    />
                    {errors.mail && (<div className="alert alert-danger mt-2" role="alert">
                        {errors.mail}
                    </div>)}


                </div>


                <div>
                    <label
                        className='label_login'>Contraseña
                    </label>
                    <input
                        onChange={(e) => setPass(e.target.value)}
                        onBlur={() => handleBlur('pass')}
                        className='input_login'
                        type="password"
                        value={pass}
                    />
                    {errors.pass && (<div className="alert alert-warning mt-2" role="alert">
                        {errors.pass}
                    </div>)}
                </div>
                <div className="div_btn">
                    <input className='btn_login' type="submit" />
                </div>
            </form>
        </section>

    )
}
