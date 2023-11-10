import cn from 'classnames';
import { useWordFilter } from '../../hooks';

const Message = ({ message }) => {
  const filterProfanity = useWordFilter();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isCurrentUser = currentUser.username === message.user;

  const messageClasses = cn('text-break mb-2', {
    'bg-light': isCurrentUser,
  });

  return (
    <div className={messageClasses}>
      <b>{message.user}</b>
      {': '}
      {filterProfanity(message.body)}
    </div>
  );
};

export default Message;
