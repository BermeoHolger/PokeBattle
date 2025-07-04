import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({ 
  baseURL: 'http://localhost:8000', 
  headers:{ 'Content-Type': 'application/json', },
});
const token = sessionStorage.getItem("Token"); 

export const getEstadisticas = async () => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/estadisticas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};
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
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};
export const registrar = async (data) => {
  try {
    const response = await axios.post(`${api.defaults.baseURL}/registro`, data);
    return response;
  } catch (error) {
    console.error('Error al registrar:', error);
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
    console.error('Error al Loguear:', error);
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
    console.error('Error al registrar el mazo:', error);
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
    console.error('Error al Editar Usuario:', error);

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
    console.error('Error al obtener los mazos:', error);
    throw error;
  }
};

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
    console.log("error al llamal al endpoint de getAtributos");
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
    console.log("error al llamal al endpoint de mandarJugada");
    throw error;
  }
}

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
    console.error('Error al obtener estadísticas:', error);
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
    console.error('Error al obtener las Cartas:', error);
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
    console.error('Error al borrar el mazo', error);
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
    console.error('Error al editar el nombre del mazo', error);
    throw error;
  }
};