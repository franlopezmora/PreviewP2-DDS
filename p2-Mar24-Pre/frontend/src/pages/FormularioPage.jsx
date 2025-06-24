import { useParams } from 'react-router-dom';
import PartidaForm from '../components/PartidaForm';

const FormularioPage = () => {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <PartidaForm idPartida={id} />
    </div>
  );
};

export default FormularioPage;
