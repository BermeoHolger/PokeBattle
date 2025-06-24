import { login } from "../../api/api";
import { useState } from "react";
import '../../assets/styles/editarUsuario.css';


export const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });
  
  const [datos, setDatos] = useState(null);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que se recargue la página
    try {
      const response = await login(formData); 
      setDatos(response.data);
      setIsLoggedIn(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setDatos(err.response.data);  // Caso error: setea el error que viene del backend
    } else {
        setDatos({ error: 'Error desconocido' });  // Por si no viene nada
    }
    }
  };
  return (
    <div className="totalLogin">
      <form onSubmit={handleSubmit} className="forma">
        <div className="barra">
          <p>Usuario:</p> 
          <input type="text" name="usuario" onChange={handleChange} value={formData.usuario}/>
        </div>
        <div className="barra">
          <p>Password:</p> 
          <input type="text" name="password" onChange={handleChange} value={formData.password}/>
        </div>
        <button type="submit" className="botonEnviarForm" onChange={handleSubmit}>Enviar</button>
      </form>

      <div className="msj">
        {datos?.status &&(
          <p>Status = {datos.status}</p>
        )}
        {datos?.error && (
          <p>Error = {datos.error}</p>
        )}
      </div>
    </div>
      
  )
}

