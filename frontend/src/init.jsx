import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { io } from 'socket.io-client';
import {
  Provider as RollbarProvider,
  ErrorBoundary as ErrorBoundaryProvider,
} from '@rollbar/react';

import App from './components/App.jsx';
import resources from './locales';
import AuthProvider from './context/AuthProvider.jsx';
import store from './slices/index.js';
import SocketProvider from './context/SocketProvider.jsx';
import WordFilterProvider from './context/WordFilterProvider';
import rollbarConfig from './rollbarConfig.js';

const init = async () => {
  const websocket = io();
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({ resources, fallbackLng: 'ru' });
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundaryProvider>
        <StoreProvider store={store}>
          <SocketProvider socket={websocket}>
            <AuthProvider>
              <WordFilterProvider>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </WordFilterProvider>
            </AuthProvider>
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundaryProvider>
    </RollbarProvider>
  );
};

export default init;
