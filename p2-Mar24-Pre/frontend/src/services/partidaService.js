import axios from 'axios';

const API = 'http://localhost:3000/api/partidas';

export const obtenerPartidas = async (filtros = {}) => {
  const res = await axios.get(API, { params: filtros });
  return res.data;
};

export const crearPartida = async (partida) => {
  const res = await axios.post(API, partida);
  return res.data;
};

export const actualizarPartida = async (id, partida) => {
  const res = await axios.put(`${API}/${id}`, partida);
  return res.data;
};

export const eliminarPartida = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

export const obtenerPartidaPorId = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};
