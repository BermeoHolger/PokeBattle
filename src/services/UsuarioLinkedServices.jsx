import axios from "axios";
import {api} from "../api/api";

const token = sessionStorage.getItem("Token"); 

export const registrar = async (data) => {
  try {
    const response = await axios.post(`${api.defaults.baseURL}/registro`, data);
    return response;
  } catch (error) {    
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${api.defaults.baseURL}/login`, data);
    const token2 = response.headers['token'];
    sessionStorage.setItem('Token', token2);
    return response;
  }
   catch (error) {    
    throw error;
  }
};

export const editarusuario = async (nuevosDatos,usuario) => {
  try {
    const response = await axios.put(`${api.defaults.baseURL}/usuarios/${usuario}`, nuevosDatos, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      }
    );    
    return response;
  }catch (error) {
    throw error;
  }
};

export const getUsuario = async (id) => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/usuarios/${id}`,{
      headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,         
        }
    });
    return response.data;
  } catch (error) {    
    throw error;
  }
  };
