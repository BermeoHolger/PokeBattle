import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RegistroPage} from "../pages/registro/RegistroPage";
import { Login } from "../pages/registro/Login";
import { EditarUsuario } from "../pages/registro/EditarUsuario";
import { AltaDeunMazo } from "../pages/AltaDeunMazo";
import { Jugar } from "../pages/Jugar";
import { MisMazos } from "../pages/MisMazos";

import  {StatPages}   from "../pages/stat/StatPages"; //santi
import { useState } from "react"; //santi



const AppRoutes = ({children, isLoggedIn, setIsLoggedIn}) => {
//import GetEstadisticas from "../pages/stat/StatPage"; HB
//import { useState } from "react"; HB 
//const AppRoutes = ({children,setIsLoggedIn}) => { HB
  return (
    <BrowserRouter>
        {children}
      <Routes>
        <Route path ="/" element ={<StatPages isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        {/*<Route path ="/" element ={<GetEstadisticas/>} /> Version con mi archivo statPage pero llamando al componente dentro de ese file*/}
        <Route path ="registro" element ={<RegistroPage/>} />
        <Route path ="login" element ={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path ="editarusuario" element ={<EditarUsuario/>} />
        <Route path ="alta" element ={<AltaDeunMazo/>} />
        <Route path ="jugar" element ={<Jugar/>} />
        <Route path ="mismazos" element ={<MisMazos/>} />
     </Routes>
    </BrowserRouter>
    
  );
};

export default AppRoutes;