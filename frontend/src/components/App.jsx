import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import { appPaths } from '../routes.js';
import { useAuth } from '../hooks/index.js';
import Header from './Navbar.jsx';

const DefaultRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={appPaths.login} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <ToastContainer />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={appPaths.login} element={<Login />} />
        <Route path={appPaths.signUp} element={<SignUp />} />
        <Route
          path={appPaths.chat}
          element={(
            <DefaultRoute>
              <ChatPage />
            </DefaultRoute>
            )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
