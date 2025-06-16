import axios from "axios";
const API_BASE_URL='http://localhost:8000';
/*export const api = axios.create({
  baseURL: 'http://localhost/Proyecto/',
  headers: {
    "Content-Type": "application/json", 
  },*/
export const getEstadisticas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/estadisticas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};
