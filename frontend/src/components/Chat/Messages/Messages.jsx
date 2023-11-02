import { useWordFilter } from '../../../hooks';

const Messages = ({ message }) => {
  const filterProfanity = useWordFilter();

  return (
    <div className="text-break mb-2">
      <b>{message.user}</b>
      {': '}
      {filterProfanity(message.body)}
    </div>
  );
};

export default Messages;
