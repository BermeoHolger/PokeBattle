import { registrar } from "../../api/api";
import { useState } from "react";

export const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
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
      const response = await registrar(formData); 
      setDatos(response.data);
    } catch (err) {
      setError("Hubo un error al registrarse");
    }
  };

  return (
    
    <div>
      Pagina para registrarse :)
      <form onSubmit={handleSubmit}>
        <ul>
        <li><label>Nombre:</label> <input type="text" name="nombre" onChange={handleChange} value={formData.nombre}/></li>
        <li>Usuario: <input type="text" name="usuario" onChange={handleChange} value={formData.usuario}/></li>
        <li>Clave: <input type="text" name="password" onChange={handleChange} value={formData.password}/></li>
          <input type="submit" value="Enviar" />
        </ul>
      </form>
        </div>
        )
}
