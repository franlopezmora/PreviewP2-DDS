import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PartidasPage from './pages/PartidasPage';
import FormularioPage from './pages/FormularioPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PartidasPage />} />
        <Route path="/nueva" element={<FormularioPage />} />
        <Route path="/editar/:id" element={<FormularioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
