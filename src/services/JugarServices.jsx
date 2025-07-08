import axios from "axios";
import {api} from "../api/api";
const token = sessionStorage.getItem("Token"); 

export const comenzarPartida = async (data,token) => {
  try {
    const response = await axios.post(`${api.defaults.baseURL}/partidas`, data, 
      {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const eliminarPartida = async () => {
  try {
    const response = await axios.put(
      `${api.defaults.baseURL}/eliminarPartida`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {    
    throw error;
  }
};

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


export const obtenerAtributosCartas = async (id_usuario,id_partida)=>{
  try{
    const response = await axios.get(`${api.defaults.baseURL}/usuarios/${id_usuario}/partidas/${id_partida}/cartas`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    )
    return response;
  }
  catch(error){    
    throw error;
  }
}

export const mandarJugada = async (data)=>{
  try{
    const response = await axios.post(`${api.defaults.baseURL}/jugadas`,data,
      {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`,         
        }
      }
    )
    return response;
  }
  catch(error){    
    throw error;
  }
}

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