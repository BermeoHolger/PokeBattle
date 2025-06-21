
import '../assets/styles/navBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBarComponent = ({isLoggedIn}) => {
  let navigate = useNavigate();
  const token = localStorage.getItem('Token');
  return (
    
    <nav className="navBar">
      
      
        {(isLoggedIn || token) ? (
          <>
          <span className='mensaje'>Hola *Agergar Nombre* </span>
          <div className='botones'>
          <button onClick={() => {navigate("/jugar");}}> Jugar </button>
          <button onClick={() => {navigate("/mismazos");}}> Mis Mazos </button>
          <button onClick={() => {navigate("/editarusuario");}}> Editar Usuario </button>
          <button onClick={() => {navigate("/logout");}}> Logout </button>     
          </div>    
          </>
        ): (
          <>
          <div className='botones'>
          <button onClick={() => {navigate("/registro");}}> REGISTRO </button>
          <button onClick={() => {navigate("/login");}}> LOGIN </button>
          </div>
          </>
        )
        }
   

    </nav>
  )
}
