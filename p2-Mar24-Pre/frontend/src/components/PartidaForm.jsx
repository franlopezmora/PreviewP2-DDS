import { useEffect, useState } from 'react';
import { crearPartida, actualizarPartida } from '../services/partidaService';
import { obtenerJuegos } from '../services/juegoService';

function PartidaForm({ partida = null, modo = 'crear', onSuccess }) {
  const [formData, setFormData] = useState({
    ID_JUEGO: '',
    FECHA: '',
    JUGADORES: '',
    GANADOR: ''
  });
  const [juegos, setJuegos] = useState([]);
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    const cargarJuegos = async () => {
      const data = await obtenerJuegos();
      setJuegos(data);
    };
    cargarJuegos();
  }, []);

  useEffect(() => {
    if (partida) {
      setFormData({
        ID_JUEGO: partida.ID_JUEGO,
        FECHA: partida.FECHA,
        JUGADORES: partida.JUGADORES,
        GANADOR: partida.GANADOR
      });
    }
  }, [partida]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    try {
      let resultado;

      if (modo === 'editar') {
        resultado = await actualizarPartida(partida.ID_PARTIDA, formData);
      } else {
        resultado = await crearPartida(formData);
      }

      if (resultado.errores) {
        setErrores(resultado.errores);
      } else {
        onSuccess();
        if (modo === 'crear') {
          setFormData({ ID_JUEGO: '', FECHA: '', JUGADORES: '', GANADOR: '' });
        }
      }
    } catch {
      setErrores(['Error al guardar partida']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{modo === 'editar' ? '✏️ Editar partida' : '➕ Registrar nueva partida'}</h4>

      {errores.length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {errores.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-5">
          <label className="form-label">Juego</label>
          <select className="form-select" name="ID_JUEGO" value={formData.ID_JUEGO} onChange={handleChange} required>
            <option value="">-- Seleccionar --</option>
            {juegos.map((j) => (
              <option key={j.ID_JUEGO} value={j.ID_JUEGO}>
                {j.NOMBRE}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" name="FECHA" value={formData.FECHA} onChange={handleChange} required />
        </div>

        <div className="col-md-2">
          <label className="form-label">Jugadores</label>
          <input type="number" className="form-control" name="JUGADORES" value={formData.JUGADORES} onChange={handleChange} required min={2} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Ganador</label>
          <input type="text" className="form-control" name="GANADOR" value={formData.GANADOR} onChange={handleChange} required />
        </div>

        <div className="col-md-6 d-flex align-items-end">
          <button className="btn btn-success w-100">Guardar</button>
        </div>
      </div>
    </form>
  );
}

export default PartidaForm;
