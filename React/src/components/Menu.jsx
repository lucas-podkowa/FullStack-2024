import { Link, useNavigate } from 'react-router-dom'


import { useEffect, useState } from 'react';


export default function Menu() {
    const navigate = useNavigate();

    const [token, setToken] = useState("");

    useEffect(() => {
        const t = sessionStorage.getItem('token')
        if (t !== token) {
            setToken(t)
            //significa actualizar mi estado interno para tener el ultimo token valido siempre
        }
    });


    function logout() {
        sessionStorage.removeItem('token');
        setToken("");
        navigate('/');
    }

    if (token !== "" && token !== null) {
        //var decoded = jwt_decode(token);
        return (<>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/reservas">
                                    Reservas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/vehiculos">
                                    Vehiculos
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    to="#">
                                    Otros
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/clinica">Clinica</Link></li>
                                    <li><Link className="dropdown-item" to="/blog">Blog</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button
                                onClick={() => logout()}
                                className='btn btn-outline-danger btn-sm'>
                                <span
                                    className="material-symbols-outlined">
                                    Cerrar Sesión
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>);
    } else {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/login" className='nav-link'>
                                        Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav >
            </>
        );
    }
}
