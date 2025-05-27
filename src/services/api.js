// src/api/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener opciones del backend
export const getOptions = () => {
  return axios.get(`${BASE_URL}/get-options`);
};

// Enviar formulario
export const submitForm = (formData) => {
  return axios.post(`${BASE_URL}/save`, formData);
};