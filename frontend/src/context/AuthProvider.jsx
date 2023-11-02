import { useCallback, useState, useMemo } from 'react';

import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userName = currentUser ? { username: currentUser.username } : null;
  const [user, setUser] = useState(userName);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getToken = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('user'));
    return userId?.token ? userId?.token : '';
  }, []);

  const auth = useMemo(
    () => ({
      user,
      logIn,
      logOut,
      getToken,
    }),
    [user, logIn, logOut, getToken],
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
