import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Login";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";
import Componente from "./components/Componente";
import HomeDoctores from "./pages/clinica/HomeDoctores";
import Blog from "./pages/blog/Blog";
import VehiculoEdit from "./pages/VehiculoEdit";
import VehiculosCard from "./pages/Vehiculos_card";
import Reservas2 from "./pages/Reservas2";


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
                        <Route path="/vehiculos" element={<VehiculosCard />} />
                        <Route path="/vehiculo/crear/" element={<VehiculoEdit />} />
                        <Route path="/vehiculo/edit/:matricula" element={<VehiculoEdit />} />


                        <Route path="/reservas" element={<Reservas2 />} />
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