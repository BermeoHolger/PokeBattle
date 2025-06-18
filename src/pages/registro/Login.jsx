import { login } from "../../api/api";
import { useState } from "react";

export const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });
  const [error, setError] = useState(null);
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
    <div>
      Logueate :)
      <form onSubmit={handleSubmit}>
        Usuario: <input type="text" name="usuario" onChange={handleChange} value={formData.usuario}/>
        Clave: <input type="text" name="password" onChange={handleChange} value={formData.password}/>
          <input type="submit" value="Enviar"/>
      </form>
      {datos?.status &&(
        <p>Status = {datos.status}</p>
      )}
      {datos?.error && (
        <p>Error = {datos.error}</p>
      )}
    </div>
      
  )
}

