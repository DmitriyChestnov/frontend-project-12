import ReactDOM from 'react-dom/client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(await init());
