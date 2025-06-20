import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({ 
  baseURL: 'http://localhost:8000', 
  headers:{ 'Content-Type': 'application/json', },
});
const token = localStorage.getItem("Token"); 

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
    return response.data;
  } catch (error) {
    console.error('Error al registrar:', error);
    throw error;
  }
};
export const login = async (data) => {
  try {
    const response = await axios.post(`${api.defaults.baseURL}/login`, data);
    const token2 = response.headers['token'];
    localStorage.setItem('Token', token2);
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

export const editarusuario = async (usuario, nuevosDatos,token) => {
  try {
    const response = await axios.put(`${api.defaults.baseURL}/usuarios/${usuario}`, nuevosDatos, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    
    return response;
  }
   catch (error) {
    console.error('Error al Editar Usuario:', error);

    throw error;
  }
};
