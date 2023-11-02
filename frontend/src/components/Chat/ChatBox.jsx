import { useSelector } from 'react-redux';
import ChannelsBox from './Channels/ChannelsBox';
import MessagesBox from './Messages/MessagesBox';
import Loading from './Loading';
import Error from './Error';

const statuses = {
  loading: 'loading',
  loaded: 'loaded',
  loadError: 'loadError',
};

const ChatBox = () => {
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);
  switch (loadingStatus) {
    case statuses.loading:
      return <Loading />;
    case statuses.loaded:
      return (
        <>
          <ChannelsBox />
          <MessagesBox />
        </>
      );
    case statuses.loadError:
      return <Error />;
    default:
      return <p>default</p>;
  }
};

export default ChatBox;
