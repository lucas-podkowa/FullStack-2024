import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


export default function Menu() {
    let isLogin = true;

    // if (isLogin) {
    return (<>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Portada</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/vehiculos">
                                Vehiculos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="reservas">
                                Reservas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="#">
                                Eventos
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                to="#">
                                Empleados
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#">Docentes</Link></li>
                                <li><Link className="dropdown-item" to="#">No Docentes</Link></li>
                                <li><Link className="dropdown-item" to="#">Directivos</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button className='btn btn-outline-danger btn-sm'>
                            <span className="material-symbols-outlined">
                                Cerrar Sesión
                            </span>
                        </button>

                    </li>
                </ul>
            </div>
        </nav>
    </>);
    // } else {
    //     return (
    //         <>
    //             <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //                 <div className="container-fluid">
    //                     <div className="collapse navbar-collapse" id="navbarNav">
    //                         <ul className="navbar-nav ms-auto">
    //                             <li className="nav-item">
    //                                 <button className='btn btn-primary btn-sm' onClick={login}>
    //                                     Iniciar Sesión
    //                                 </button>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </nav>
    //         </>
    //     );
    // }
}
