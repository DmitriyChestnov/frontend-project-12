import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

import { useWordFilter } from '../../../hooks';
import Message from './Message.jsx';
import MessageInput from './MessageInput.jsx';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../../../slices/messagesSlice.js';

const MessagesBox = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const currentMessages = useSelector(messagesSelectors.selectById);
  const filterProfanity = useWordFilter();
  const channelName = filterProfanity(currentChannel?.name);
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {channelName}
            </b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: currentMessages.length })}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5" ref={messagesRef}>
          {currentMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <MessageInput />
      </div>
    </Col>
  );
};

export default MessagesBox;
