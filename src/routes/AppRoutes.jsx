import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RegistroPage} from "../pages/registro/RegistroPage";
import { Login } from "../pages/registro/Login";
import { EditarUsuario } from "../pages/registro/EditarUsuario";
import { AltaDeunMazo } from "../pages/AltaDeunMazo";
import { Jugar } from "../pages/Jugar";
import { MisMazos } from "../pages/MisMazos";
import  {StatPages}   from "../pages/stat/StatPages";
import { useState } from "react";



const AppRoutes = ({children, isLoggedIn, setIsLoggedIn}) => {
  return (
    <BrowserRouter>
        {children}
      <Routes>
        <Route path ="/" element ={<StatPages isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path ="registro" element ={<RegistroPage/>} />
        <Route path ="login" element ={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path ="editarusuario" element ={<EditarUsuario/>} />
        <Route path ="alta" element ={<AltaDeunMazo/>} />
        <Route path ="jugar" element ={<Jugar/>} />
        <Route path ="mismazos" element ={<MisMazos/>} />
        <Route path ="logout" element ={<StatPages/>} />
     </Routes>
    </BrowserRouter>
    
  );
};

export default AppRoutes;