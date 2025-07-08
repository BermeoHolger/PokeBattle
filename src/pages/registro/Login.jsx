import { login } from "../../services/UsuarioLinkedServices";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/editarUsuario.css';
import NotiToast from "../../components/NotiToast";


export const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });
  
  const [datos, setDatos] = useState(null);
  const token = sessionStorage.getItem('Token');

  const navigate = useNavigate();
  useEffect (() => {
    if(token){
      navigate("/");
      window.location.reload();
    }
  }, [token,navigate]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await login(formData); 
      setDatos(response.data);
      console.log(datos);
      if(datos.status){
        formData.usuario="";
        formData.password="";
      }
      setTimeout(() => setDatos(null), 3000);
      setIsLoggedIn(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setDatos(err.response.data);  
      } else {
        setDatos({ error: 'Error desconocido' });  
      }
      setTimeout(() => setDatos(null), 3000);
    }
  };
  return (
    <div className="totalLogin">
      <form onSubmit={handleSubmit} className="forma" autoComplete="on">
        <div className="barra">
          <p>Usuario:</p> 
          <input type="text" name="usuario" onChange={handleChange} value={formData.usuario}/>
        </div>
        <div className="barra">
          <p>Password:</p> 
          <input type="password" name="password" onChange={handleChange} value={formData.password}/>
        </div>
        <button type="submit" className="botonEnviarForm" onChange={handleSubmit}>Enviar</button>
      </form>

        {datos?.status &&
          <NotiToast mensaje= {datos.status} tipo="exito"/> 
        }
        {datos?.error && 
          <NotiToast mensaje= {datos.error} tipo="error"/> 
        }      
    </div>
      
  )
}

