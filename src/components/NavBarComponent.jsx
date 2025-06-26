
import '../assets/styles/navBar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsuario } from '../api/api';
import { jwtDecode } from 'jwt-decode';

export const NavBarComponent = ({isLoggedIn,setIsLoggedIn}) => {
  let navigate = useNavigate();
  const token = sessionStorage.getItem('Token');
  const [nombre, setNombre] = useState("");
  
  useEffect(() => {
      if(token){
        let datos = jwtDecode(token);
        const id_user = datos.usuario;
      
      const fetchDatos = async () => {
        try {
          const response = await getUsuario(id_user);
          setNombre(response.nombre);
        } catch (err) {
          setNombre("error");
        }
      };
  
      fetchDatos();}
    }, [token]);
  return (
    <nav className="navBar">
    
        {(isLoggedIn || token) ? ( //agregar el or token 
          <>
          <span className='mensaje'>Hola {nombre}</span>
          <div className='botones'>
          <button onClick={() => {navigate("/jugar");}}> Jugar </button>
          <button onClick={() => {navigate("/mismazos");}}> Mis Mazos </button>
          <button onClick={() => {navigate("/editarusuario");}}> Editar Usuario </button>
          <button onClick={() => {navigate("/"); sessionStorage.removeItem('Token'); setIsLoggedIn(false);}}> Logout </button>
          </div>         
          </>
        ): (
          <>
          <div className='botones'>
          <button onClick={() => {navigate("/registro");}}> Registro </button>
          <button onClick={() => {navigate("/login");}}> Login </button>
          </div>
          </>
        )
        }
   

    </nav>
  )
}
