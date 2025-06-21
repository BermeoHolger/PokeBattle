import React, { useState } from 'react';
import { getEstadisticas } from '../../api/api';

const GetEstadisticas = () => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const[ocultar,setOcultar]= useState(true);

  const mostrarTodo = async () => {
    setOcultar(!ocultar);
    try {
      const response = await getEstadisticas();
      setDatos(response);
      console.log(response);
    } catch (err) {
      setError('Hubo un error al obtener las estadísticas');
    }
  };
  return (
    <div>
      <h2>Estadísticas</h2>
      <button onClick={mostrarTodo}> {ocultar ? " Mostrar estadísticas": "Ocultar Estadisticas"}  </button>

      {error && <p>{error}</p>}
      {ocultar? 
      <>
      </>         
      : 
      <>
        <table>
          <thead>
            <tr><th>Estas son las estadísitcas</th></tr>
          </thead>
          <tbody>
            <tr> 
              <td>       
              {datos.map((item, index) => (
                <ul key={index}> {JSON.stringify(item)} </ul>
              ))} 
              </td>       
            </tr>
        </tbody>
        </table>
      </>
      }
      
    </div>
  );
};

export default GetEstadisticas;
