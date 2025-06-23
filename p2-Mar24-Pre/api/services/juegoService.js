import axios from 'axios';

const API = 'http://localhost:3000/api/juegos';

export const obtenerJuegos = async () => {
  const res = await axios.get(API);
  return res.data;
};
