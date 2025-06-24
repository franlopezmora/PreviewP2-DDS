import { useCallback, useEffect, useState } from 'react';
import { obtenerPartidas, eliminarPartida } from '../services/partidaService';
import { obtenerJuegos } from '../services/juegoService';
import PartidaForm from '../components/PartidaForm';


function PartidasPage() {
  const [partidas, setPartidas] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [filtros, setFiltros] = useState({ ID_JUEGO: '', FECHA_LIMITE: '' });
  const [partidaEditando, setPartidaEditando] = useState(null);
  const [juegoActivo, setJuegoActivo] = useState(null);



  const cargarPartidas = useCallback(async () => {
    const datos = await obtenerPartidas(filtros);
    setPartidas(datos);
  }, [filtros]);


  const cargarJuegos = async () => {
    const datos = await obtenerJuegos();
    setJuegos(datos);
  };


  const cargarPartidasIniciales = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/partidas?inicio=true');

    const data = await response.json();
    setPartidas(data);
  } catch (error) {
    console.error('Error al cargar las partidas iniciales', error);
  }
};


  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar partida?')) return;
    await eliminarPartida(id);
    cargarPartidas();
  };

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
    cargarPartidas();
  };

  const handleEditar = (partida) => {
  setPartidaEditando(partida);
};


  useEffect(() => {
    cargarJuegos();
    cargarPartidasIniciales();
  }, []);



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow p-4">
            <h2 className="mb-4">
              📋 <strong>Partidas Jugadas</strong>
            </h2>
        
          <PartidaForm
            partida={partidaEditando}
            modo={partidaEditando ? 'editar' : 'crear'}
            onSuccess={() => {
              cargarPartidas();
              setPartidaEditando(null);
            }}
          />

          {partidaEditando && (
            <div className="mb-4">
              <button className="btn btn-secondary" onClick={() => setPartidaEditando(null)}>
                Cancelar edición
              </button>
            </div>
          )}

          <form className="row g-3 mb-3" onSubmit={handleFiltrar}>
            <div className="col-md-5">
              <label className="form-label">Juego</label>
              <select className="form-select" name="ID_JUEGO" value={filtros.ID_JUEGO} onChange={handleChange}>
                <option value="">-- Todos --</option>
                {juegos.map((j) => (
                  <option key={j.ID_JUEGO} value={j.ID_JUEGO}>
                    {j.NOMBRE}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Fecha hasta</label>
              <input type="date" className="form-control" name="FECHA_LIMITE" value={filtros.FECHA_LIMITE} onChange={handleChange} />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-primary w-100">Filtrar</button>
            </div>
          </form>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Juego</th>
                <th>Fecha</th>
                <th>Jugadores</th>
                <th>Ganador</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {partidas.map((p) => (
                <tr key={p.ID_PARTIDA}>

                  <td>
                    <button
                      className="btn btn-link p-0"
                      onClick={() => setJuegoActivo(juegoActivo === p.ID_PARTIDA ? null : p.ID_PARTIDA)}
                    >
                      {p.juego?.NOMBRE}
                    </button>

                    {juegoActivo === p.ID_PARTIDA && (
                      <div className="mt-2 border rounded p-2 bg-light">
                        <div className="d-flex align-items-start">
                          <img
                            src={p.juego?.URL_IMAGEN || 'https://placehold.co/100x150?text=Sin+imagen'}
                            onError={(e) => {
                              e.target.onerror = null; // prevenir loop
                              e.target.src = 'https://placehold.co/100x150?text=Sin+imagen';
                            }}
                            alt="portada"
                            style={{ width: 100, height: 150, objectFit: 'cover', marginRight: '1rem' }}
                          />
                          <div>
                            <p><strong>🧠 Descripción:</strong> {p.juego?.DESCRIPCION || 'Sin descripción'}</p>
                            <p><strong>🕓 Duración:</strong> {p.juego?.DURACION_MINUTOS} min</p>
                            <p><strong>👶 Edad mínima:</strong> {p.juego?.EDAD_RECOMENDADA} años</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>

                  <td>{p.FECHA}</td>
                  <td>{p.JUGADORES}</td>
                  <td>{p.GANADOR}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(p)}>
                      Editar
                    </button>

                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(p.ID_PARTIDA)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartidasPage;
