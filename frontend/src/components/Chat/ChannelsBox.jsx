import { Col, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import Channel from './Channel.jsx';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    dispatch(modalsActions.open({ type: 'adding', targetId: null }));
  };
  const channelRef = useRef(null);

  useEffect(() => {
    channelRef.current.scrollTo(0, channelRef.current.scrollHeight);
  });

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelsTitle')}</b>
        <button
          onClick={handleAddChannel}
          className="p-0 text-primary btn btn-group-vertical"
          type="button"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav
        variant="pills"
        className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        ref={channelRef}
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={currentChannelId === channel.id}
          />
        ))}
      </Nav>
    </Col>
  );
};

export default ChannelsBox;
