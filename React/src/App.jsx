import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Vehiculos from "./pages/Vehiculos";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";
import Componente from "./components/Componente";
import HomeDoctores from "./pages/clinica/HomeDoctores";
import Reservas from "./pages/Reservas";
import Blog from "./pages/blog/Blog";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Menu />
                    <ToastContainer />
                    <Routes>
                        {/* Landing Page */}
                        <Route path="/" element={<Home />} />

                        {/* Login */}
                        <Route path="/login" element={<Login />}></Route>

                        {/* Rutas del MENU */}
                        <Route path="/vehiculos" element={<Vehiculos />} />
                        <Route path="/reservas" element={<Reservas />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/clinica" element={<HomeDoctores />} />

                        <Route path="/componente" element={<Componente />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;