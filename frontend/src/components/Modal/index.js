import Add from './AddChannel.jsx';
import Rename from './RenameChannel.jsx';
import Remove from './RemoveChannel.jsx';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const getModalComponent = (modalType) => {
  if (modalType === null) {
    return null;
  }

  const ModalComponent = modals[modalType];
  return <ModalComponent />;
};

export default getModalComponent;
