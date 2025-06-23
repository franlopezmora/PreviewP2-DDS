import express from 'express';
import juegoModel from '../models/juego.js';
import sequelize from '../db.js';

const router = express.Router();
const Juego = juegoModel(sequelize, sequelize.Sequelize);

router.get('/', async (req, res) => {
  const juegos = await Juego.findAll();
  res.json(juegos);
});

export default router;
