import axios from "axios";
import {api} from "../api/api";

export const getEstadisticas = async () => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/estadisticas`);
    return response.data;
  } catch (error) {    
    throw error;
  }
};