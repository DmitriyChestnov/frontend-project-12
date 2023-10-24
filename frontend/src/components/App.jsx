import React, { useState, useMemo } from 'react';
import {
  BrowserRouter, Routes, Route, Link, Navigate,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import NotFound from './NotFound.jsx';
import routes from '../routes.js';
import AuthContext, { useAuth } from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const item = localStorage.getItem('userData');
    return item ? JSON.parse(item) : null;
  });
  const logIn = (data) => {
    setUserData(data);
    const stringedData = JSON.stringify(data);
    localStorage.setItem('userData', stringedData);
  };
  const logOut = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };
  const auth = useMemo(() => ({ userData, logIn, logOut }), [userData]);
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.userData ? children : <Navigate to={routes.loginPage} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand as={Link} to={routes.homePage}>Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
