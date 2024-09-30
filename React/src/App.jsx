import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Vehiculos from "./pages/Vehiculos";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";


function App() {
    return (
        <>
            <BrowserRouter>
                <div className="container">
                    <Menu />

                    <Routes>
                        {/* Landing Page */}
                        <Route path="/" element={<Home />} />

                        {/* Login */}
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/vehiculos" element={<Vehiculos />} />
                        <Route path="*" element={<NotFound />} />
                        
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;