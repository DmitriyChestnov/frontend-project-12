import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
