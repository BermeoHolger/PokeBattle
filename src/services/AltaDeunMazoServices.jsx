import axios from "axios";
import {api} from "../api/api";
const token = sessionStorage.getItem("Token"); 

export const cartas = async (data) => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/cartas`, 
      {
        params: {
          atributo: data.atributo,
          nombre: data.nombre
        }
      }
    );
    return response.data;
  } catch (error) {    
    throw error;
  }
};

export const altaMazo = async (data) => {
  try {
    const response = await axios.post(`${api.defaults.baseURL}/mazos`, data,
      {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {    
    throw error;
  }
};