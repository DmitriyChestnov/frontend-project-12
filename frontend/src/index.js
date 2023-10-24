import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { ChatApiContext } from './contexts/index.jsx';
import App from './components/App.jsx';
import store from './slices/index.js';

const socketTimeoutMs = 5000;

const init = async () => {
  const socket = io();
  console.debug(`Subscribe for socket events (socket.id=${socket.id})`);
  socket
    .on('connect', () => {
      console.debug(`socket "connect" id=${socket.id}`);
    })
    .on('connect', () => {
      console.debug('socket "connect_error"');
    })
    .on('disconnect', (reason) => {
      console.debug(`socket "disconnect" (${reason})`);
    })

    .on('newMessage', (payload) => {
      console.debug('newMessage "event"', payload);
      store.dispatch(messagesActions.addMessage(payload));
    });
  const getSocketEmitPromise = (...args) => new Promise((resolve, reject) => {
    socket.timeout(socketTimeoutMs).emit(...args, (err, response) => {
      if (err) reject(err); // the other side did not acknowledge the event in the given delay
      resolve(response);
    });
  });
  const chatApi = { newMessage: (...args) => getSocketEmitPromise('newMessage', ...args) };
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ChatApiContext.Provider value={chatApi}>
            <App />
            <ToastContainer pauseOnFocusLoss={false} position="top-center" />
          </ChatApiContext.Provider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

const app = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      { vdom }
    </React.StrictMode>,
  );
};

app();
