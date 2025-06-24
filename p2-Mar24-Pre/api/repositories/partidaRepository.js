import juegoModel from '../models/juego.js';
import partidaModel from '../models/partida.js';
import sequelize from '../db.js';
import { Op } from 'sequelize';

const Juego = juegoModel(sequelize, sequelize.Sequelize);
const Partida = partidaModel(sequelize, sequelize.Sequelize);

Juego.associate?.({ Partida });
Partida.associate?.({ Juego });

const obtenerTodas = async (filtros = {}) => {
  const where = {};

  if (filtros.ID_JUEGO) {
    where.ID_JUEGO = filtros.ID_JUEGO;
  }

  if (filtros.FECHA_LIMITE) {
    where.FECHA = {
      [Op.lte]: filtros.FECHA_LIMITE
    };
  }
  console.log('Filtros recibidos:', filtros);

  const limite = filtros.inicio === 'true' ? 10 : 25;

  return await Partida.findAll({
    where,
    include: {
      model: Juego,
      as: 'juego'
    },
    order: [['FECHA', 'DESC']],
    limit: limite
  });
};


const obtenerPorId = async (id) => {
  return await Partida.findByPk(id, {
    include: {
      model: Juego,
      as: 'juego'
    }
  });
};

const crear = async (datos) => {
  return await Partida.create(datos);
};

const actualizar = async (id, datos) => {
  const partida = await Partida.findByPk(id);
  if (!partida) return null;

  await partida.update(datos);
  return partida;
};

const eliminar = async (id) => {
  const partida = await Partida.findByPk(id);
  if (!partida) return null;

  await partida.destroy();
  return partida;
};

export {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};
