import axios from "axios";
const API_BASE_URL='http://localhost:8000';
export const getEstadisticas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/estadisticas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};
export const registrar = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/registro`, data);
    return response.data;
  } catch (error) {
    console.error('Error al registrar:', error);
    throw error;
  }
};
