import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import GetEstadisticas from "../components/GetEstadisticas";
import Home from "../pages/Home";
import {RegistroPage} from "../pages/registro/RegistroPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="estadisticas" element={<GetEstadisticas />} />
      <Route path="/" element ={<Home/>} />
      <Route path ="registro" element ={<RegistroPage/>} />

    </Routes>
    </BrowserRouter>
    
  );
};

export default AppRoutes;