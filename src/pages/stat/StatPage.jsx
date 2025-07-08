import { useState, useEffect } from 'react';
import { getEstadisticas } from '../../api/api';
import '../../styles/statpage.css';

export const StatPages = () => {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await getEstadisticas();
        setDatos(response);
      } catch (err) {
        setError('Error al obtener las estadisticas');
      }
    };

    fetchDatos();
  }, []);

  const cambiarOrden = () => {
    setOrdenAscendente(!ordenAscendente);
  };

  const maxProm = Math.max(...datos.map(item => {
    let partidas = item.Gano + item.Perdio + item.Empato;
    return partidas === 0 ? 0 : (item.Gano / partidas);
  }));

  const datosOrdenados = [...datos].sort((a, b) => {
    let partidasA = a.Gano + a.Perdio + a.Empato;
    let promA = a.Gano / partidasA;

    let partidasB = b.Gano + b.Perdio + b.Empato;
    let promB = b.Gano / partidasB;

    return ordenAscendente ? promA - promB : promB - promA;
  });

  return (
    !datos ? (<h1>No Hay Estadisticas</h1>):(
    <div>
      <div className='estadisticas'>
        <h2>Estadísticas</h2>
        {error ? ( <p>{error}</p> ):(

        <div>
          <table className="tablaStats">
            <thead className="tablaS">
              <tr>
                <th>Nombre</th>
                <th>Partidas</th>
                <th>Gano</th>
                <th>Perdio</th>
                <th>Empato</th> 
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {datosOrdenados.map((item) => {
                let partidas = item.Gano + item.Perdio + item.Empato;
                let prom = (item.Gano / partidas);
                let esMaximo = prom === maxProm;
                return (
                  <tr key={item.id} className={esMaximo ? 'items-maximo' : 'items'}>
                    <td>{item.nombre}</td>
                    <td>{partidas}</td>
                    <td>{item.Gano}</td>
                    <td>{item.Perdio}</td>
                    <td>{item.Empato}</td>
                    <td>{(prom * 100).toFixed(0)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={cambiarOrden}>
            Ordenar {ordenAscendente ? '▲' : '▼'}
          </button>
        </div>
        )}
      </div>
    </div>
    )
  );
};

