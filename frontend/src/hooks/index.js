import { useContext } from 'react';

import {
  AuthContext,
  SocketContext,
  WordFilterContext,
} from '../context/index.js';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
export const useWordFilter = () => useContext(WordFilterContext);
