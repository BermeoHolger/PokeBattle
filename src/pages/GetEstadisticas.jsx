import { getEstadisticas } from '../services/apiService';

const GetEstadisticas = () => {
  const handleTryOut = async () => {
    const response = await getEstadisticas();
    return response;
  };
};

export default GetEstadisticas;