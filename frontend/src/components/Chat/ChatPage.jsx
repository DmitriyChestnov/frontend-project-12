import React, { useEffect, useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ChatBox from './ChatBox.jsx';
import getModalComponent from '../Modal/index.js';
import fetchDataThunk from '../../thunk.js';
import { useAuth, useSocket } from '../../hooks';
import { selectors as modalsSelectors } from '../../slices/modalsSlice.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as messagesActions } from '../../slices/messagesSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getToken, logOut } = useAuth();
  const authHeaders = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    [getToken],
  );
  const socketConstext = useSocket();
  const modalType = useSelector(modalsSelectors.selectModalType);
  const error = useSelector((state) => state.channels.error);

  useEffect(() => {
    dispatch(fetchDataThunk(authHeaders));
    if (error?.errorCode === 500) {
      logOut();
    }

    return () => socketConstext.disconnectSocket();
  }, [dispatch, socketConstext, authHeaders, error, logOut]);

  const { socket } = socketConstext;

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
  });

  socket.on('removeChannel', (data) => {
    dispatch(channelsActions.removeChannel(data.id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(
      channelsActions.renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      }),
    );
  });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatBox />
      </Row>
      {getModalComponent(modalType)}
    </Container>
  );
};

export default ChatPage;
