import Routes from './routes';
import './styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

//https://sujeitoprogramador.com/r-api/?api=filmes || API Filmes

export default function App() {
  return (
    <div className='app'>
      <Routes/>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
