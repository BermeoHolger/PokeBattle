import axios from "axios";
import {api} from "../api/api";

const token = sessionStorage.getItem("Token"); 

export const recuperarMazos = async (id_user) => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/usuarios/${id_user}/mazos`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response;
  } catch (error) {    
    throw error;
  }
};

export const getCartasMazo = async (id) => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/cartas/${id}`,{
      headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,         
        }
    });
    return response;
  } catch (error) {    
    throw error;
  }
  };

  export const eliminarMazo = async (mazo) => {
    try {
      const response = await axios.delete(`${api.defaults.baseURL}/mazos/${mazo}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response; 
    }
    catch (error) {
        
      throw error;
     
    }
  };

  export const editarMazo = async (mazo_id, data) => {
  try {
    const response = await axios.put(`${api.defaults.baseURL}/mazos/${mazo_id}`, data, {
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
      }
    });
    return response;
  }
  catch (error){
    
    throw error;
  }
};