import React, { useState } from 'react';
import { getEstadisticas } from '../api/api';

const GetEstadisticas = () => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  const handleTryOut = async () => {
    try {
      const response = await getEstadisticas();
      setDatos(response);
    } catch (err) {
      setError('Hubo un error al obtener las estadísticas');
    }
  };
 /* const handleTryOut = async () => {
    const response = await getEstadisticas();
    return response;
  };*/
  return (
    <div>
      <h2>Estadísticas</h2>
      <button onClick={handleTryOut}>Cargar estadísticas</button>

      {error && <p>{error}</p>}

      <ul>
        {datos.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetEstadisticas;