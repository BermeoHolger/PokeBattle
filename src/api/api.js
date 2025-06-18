import axios from "axios";
import { useState, useEffect } from "react";

const api = axios.create({ 
  baseURL: 'http://localhost:8000', 
  headers:{ 'Content-Type': 'application/json', },
});
export const getEstadisticas = async () => {
  try {
    const response = await axios.get(`${api.defaults.baseURL}/estadisticas`);
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
    const token = response.headers['token'];
    localStorage.setItem('Token', token);
    return response;
  }
   catch (error) {
    console.error('Error al Loguear:', error);
    throw error;
  }
};
