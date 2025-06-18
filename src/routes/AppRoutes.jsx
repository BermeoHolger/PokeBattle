import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RegistroPage} from "../pages/registro/RegistroPage";
import { Login } from "../pages/registro/Login";
import { EditarUsuario } from "../pages/registro/EditarUsuario";
import { AltaDeunMazo } from "../pages/AltaDeunMazo";
import { Jugar } from "../pages/Jugar";
import { MisMazos } from "../pages/MisMazos";
import GetEstadisticas from "../pages/GetEstadisticas";

const AppRoutes = ({children}) => {
  return (
    <BrowserRouter>
        {children}
      <Routes>
        <Route path ="/" element ={<GetEstadisticas/>} />
        <Route path ="registro" element ={<RegistroPage/>} />
        <Route path ="login" element ={<Login/>} />
        <Route path ="editarusuario" element ={<EditarUsuario/>} />
        <Route path ="alta" element ={<AltaDeunMazo/>} />
        <Route path ="jugar" element ={<Jugar/>} />
        <Route path ="mismazos" element ={<MisMazos/>} />
        <Route path ="logout" element ={<GetEstadisticas/>} />
     </Routes>
    </BrowserRouter>
    
  );
};

export default AppRoutes;