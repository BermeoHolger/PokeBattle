import { useState } from 'react'
import HeaderComponent from './components/HeaderComponent.jsx'
import AppRoutes from './routes/index.jsx';

import { getEstadisticas } from './api/api.js';

const App = () => {
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

  return (
    <>

      <HeaderComponent/>
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
      </div>
      
   </>
  )
}

export default App
