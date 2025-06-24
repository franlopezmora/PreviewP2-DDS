import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearPartida, actualizarPartida } from '../services/partidaService';
import { obtenerJuegos } from '../services/juegoService';
import { obtenerPartidaPorId } from '../services/partidaService';


function PartidaForm({ idPartida }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ID_JUEGO: '',
    FECHA: '',
    JUGADORES: '',
    GANADOR: ''
  });
  const [juegos, setJuegos] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const cargarDatos = async () => {
      const juegos = await obtenerJuegos();
      setJuegos(juegos);

      if (idPartida) {
        const data = await obtenerPartidaPorId(idPartida);
        setFormData({
          ID_JUEGO: data.ID_JUEGO,
          FECHA: data.FECHA,
          JUGADORES: data.JUGADORES,
          GANADOR: data.GANADOR
        });
      }
    };
    cargarDatos();
  }, [idPartida]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const errs = {};
    if (!formData.ID_JUEGO) errs.ID_JUEGO = 'Debe seleccionar un juego';
    if (!formData.FECHA) errs.FECHA = 'Debe ingresar una fecha';
    if (!formData.JUGADORES || formData.JUGADORES < 2) errs.JUGADORES = 'Mínimo 2 jugadores';
    if (!formData.GANADOR) errs.GANADOR = 'Debe ingresar un nombre de ganador';
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    if (idPartida) {
      await actualizarPartida(idPartida, formData);
    } else {
      await crearPartida(formData);
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h3 className="mb-2">{idPartida ? 'Editar' : 'Nueva'} Partida</h3>

      { idPartida && (
        <p className="text-muted mb-3">ID de partida: <strong>{idPartida}</strong></p>
      )}


      <div className="mb-3">
        <label className="form-label">Juego</label>
        <select
          className="form-select"
          name="ID_JUEGO"
          value={formData.ID_JUEGO}
          onChange={handleChange}
        >
          <option value="">-- Seleccionar --</option>
          {juegos.map((j) => (
            <option key={j.ID_JUEGO} value={j.ID_JUEGO}>
              {j.NOMBRE}
            </option>
          ))}
        </select>
        {errores.ID_JUEGO && <div className="text-danger">{errores.ID_JUEGO}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          name="FECHA"
          value={formData.FECHA}
          onChange={handleChange}
        />
        {errores.FECHA && <div className="text-danger">{errores.FECHA}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Cantidad de jugadores</label>
        <input
          type="number"
          className="form-control"
          name="JUGADORES"
          value={formData.JUGADORES}
          onChange={handleChange}
        />
        {errores.JUGADORES && <div className="text-danger">{errores.JUGADORES}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Ganador</label>
        <input
          type="text"
          className="form-control"
          name="GANADOR"
          value={formData.GANADOR}
          onChange={handleChange}
        />
        {errores.GANADOR && <div className="text-danger">{errores.GANADOR}</div>}
      </div>

      <button className="btn btn-primary">
        {idPartida ? 'Guardar Cambios' : 'Registrar Partida'}
      </button>
    </form>
  );
}

export default PartidaForm;
