import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../../slices/modalsSlice.js';
import { useWordFilter } from '../../../hooks';

const Channel = ({ isActive, channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filterProfanity = useWordFilter();
  const channelName = filterProfanity(channel.name);

  const switchHandler = () => {
    dispatch(channelsActions.switchChannel({ id: channel.id }));
  };

  const hendlerRename = () => {
    dispatch(modalsActions.open({ type: 'renaming', targetId: channel.id }));
  };

  const hendlerRemove = () => {
    dispatch(modalsActions.open({ type: 'removing', targetId: channel.id }));
  };

  return (
    <Nav.Item className="w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            variant={isActive ? 'secondary' : null}
            onClick={switchHandler}
          >
            <span>#</span>
            {channelName}
          </Button>

          <Dropdown.Toggle
            split
            variant={isActive ? 'secondary' : null}
            className="flex-grow-0"
            id="dropdown-split-basic"
          >
            <span className="visually-hidden">{t('modal.toggle')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={hendlerRename}>
              {t('modal.rename')}
            </Dropdown.Item>
            <Dropdown.Item onClick={hendlerRemove}>
              {t('modal.remove')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          className="w-100 rounded-0 text-start"
          variant={isActive ? 'secondary' : null}
          onClick={switchHandler}
        >
          <span>#</span>
          {channelName}
        </Button>
      )}
    </Nav.Item>
  );
};

export default Channel;
