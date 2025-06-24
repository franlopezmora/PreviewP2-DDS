import express from 'express';
const router = express.Router();
import * as partidaService from '../services/partidaService.js';


// Obtener partidas (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const filtros = {
      ID_JUEGO: req.query.ID_JUEGO,
      FECHA_LIMITE: req.query.FECHA_LIMITE,      
      inicio: req.query.inicio // Asegurate de que esto se pase
    };
    const partidas = await partidaService.listar(filtros);
    res.json(partidas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener partidas' });
  }
});

// Obtener partida por ID
router.get('/:id', async (req, res) => {
  try {
    const partida = await partidaService.obtener(req.params.id);
    if (!partida) return res.status(404).json({ error: 'Partida no encontrada' });
    res.json(partida);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener partida' });
  }
});

// Crear partida
router.post('/', async (req, res) => {
  try {
    const nueva = await partidaService.crearPartida(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ errores: err.errores || ['Error al crear partida'] });
  }
});

// Actualizar partida
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await partidaService.actualizarPartida(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Partida no encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ errores: err.errores || ['Error al actualizar partida'] });
  }
});

// Eliminar partida
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await partidaService.eliminarPartida(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Partida no encontrada' });
    res.json({ mensaje: 'Partida eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar partida' });
  }
});

export default router;
