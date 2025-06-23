import { obtenerTodas, obtenerPorId, crear, actualizar, eliminar } from '../repositories/partidaRepository.js';

import juegoModel from '../models/juego.js';
import sequelize from '../db.js';
const Juego = juegoModel(sequelize, sequelize.Sequelize);


const esFechaValida = (fecha) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha);
};

const validarDatos = async (datos) => {
  const errores = [];

  if (!datos.FECHA || !esFechaValida(datos.FECHA)) {
    errores.push("La fecha es inválida. Debe tener formato YYYY-MM-DD.");
  }

  if (!datos.GANADOR || datos.GANADOR.trim() === "") {
    errores.push("Debe especificar un ganador.");
  }

  if (!datos.JUGADORES || datos.JUGADORES < 2) {
    errores.push("Debe haber al menos 2 jugadores.");
  }

  const juego = await Juego.findByPk(datos.ID_JUEGO);
  if (!juego) {
    errores.push("El juego seleccionado no existe.");
  }

  return errores;
};

const listar = async (filtros) => {
  return await obtenerTodas(filtros);
};

const obtener = async (id) => {
  return await obtenerPorId(id);
};

const crearPartida = async (datos) => {
  const errores = await validarDatos(datos);
  if (errores.length > 0) {
    throw { errores };
  }

  return await crear(datos);
};

const actualizarPartida = async (id, datos) => {
  const errores = await validarDatos(datos);
  if (errores.length > 0) {
    throw { errores };
  }

  return await actualizar(id, datos);
};

const eliminarPartida = async (id) => {
  return await eliminar(id);
};

export {
  listar,
  obtener,
  crearPartida,
  actualizarPartida,
  eliminarPartida
};

