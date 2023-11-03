import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import ChatPage from './Chat/ChatPage.jsx';

const DefaultRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={routes.loginPage()} />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={routes.loginPage()} element={<Login />} />
        <Route path={routes.signUpPage()} element={<SignUp />} />
        <Route
          path={routes.chatPage()}
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
