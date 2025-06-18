
import '../assets/styles/navBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBarComponent = () => {
  let navigate = useNavigate();
  return (
    <nav className="navBar">
      <a>Hola *Agergar Nombre* </a>
      <div className='button'>
        <button onClick={() => {navigate("/registro");}}> REGISTRO </button>
        <button onClick={() => {navigate("/login");}}> LOGIN </button>
        <button onClick={() => {navigate("/mismazos");}}> Mis Mazos </button>
        <button onClick={() => {navigate("/editarusuario");}}> Editar Usuario </button>
        <button onClick={() => {navigate("/logout");}}> LOGOUT </button>

      </div>

    </nav>
  )
}
