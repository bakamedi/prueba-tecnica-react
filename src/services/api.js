// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

// Obtener opciones del backend
export const getOptions = () => {
  return axios.get(`${BASE_URL}/get-options`);
};

// Enviar formulario
export const submitForm = (formData) => {
  return axios.post(`${BASE_URL}/save`, formData);
};