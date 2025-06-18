
import '../assets/styles/navBar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBarComponent = () => {
  return (    
    <nav className="navBar"> 
        <a href= "/registro">Hola *Agergar Nombre* </a>      
        <div className='button'> 
            <button >REGISTRO </button>            
            <button>LOGIN</button>           
            <button> Mis Mazos</button>
            <button> Editar Usuario</button>
            <button> LOGOUT </button>

        </div>         

    </nav>
  )
}
