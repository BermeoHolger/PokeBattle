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

/*
const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const data = await getEstadisticas();
      setResponse({data, error: false });
    } catch (e) {
      const errorMsg = e.response?.data ?? { error: 'Unknown error'};
      setResponse({ data: errorMsg, error: true });
    }
  };

<div className='estadisticas'>
        <button className="btn btn-primary" onClick={handleClick}>Try Out </button>
        {response && (
          <>
            <h5>Response:</h5>
            <pre className={`p-3 rounded ${response.error ? 'bg-danger-subtle' : 'bg-success-subtle'}`}>
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </>
        )}
</div> */