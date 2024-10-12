import React, { useState } from 'react'

export default function Login() {

    //onSubmit --> atrapa los datos del formulario
    //onChange --> attrapa los datos del elemento donde lo tengo declarado
    //e --> objeto que nos devuelve el evento onChange
    //e.target.value --> valor del elemento que esta disparando el evento

    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');


    function submitHandler(e) {
        //Para cancelar el evento por defecto del formulario
        e.preventDefault();

        console.log(`el usuario es ${mail} y la contaseña es ${pass}`);

        // recien ahora podemos hacer un fech al backend, enviarles estos datos 
        // por ejemplo a http://localhost:8080/login
        // una vez que tengamos la confirmacion pasamos a hacer un navigate() al dashboard

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
