import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useSocket } from '../../hooks';
import { actions as modalsActions } from '../../store/slices/modalsSlice';

const Remove = () => {
  const { isOpened, targetId } = useSelector((state) => state.modals);
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const chatApi = useSocket();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => dispatch(modalsActions.close());

  const hendleRemove = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await chatApi.removeChannel({ id: targetId });
      dispatch(modalsActions.close());
      toast.success(t('success.removeChannel'));
      setIsSubmitting(false);
    } catch (error) {
      toast.error(t('errors.channelRemove'));
      rollbar.error('renameChannel', error);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Modal.Title>{t('modal.confirm')}</Modal.Title>
        <Modal.Footer>
          <Form onSubmit={hendleRemove}>
            <Form.Group>
              <Button
                className="me-2"
                variant="secondary"
                onClick={handleClose}
              >
                {t('cancel')}
              </Button>
              <Button type="submit" variant="danger" disabled={isSubmitting}>
                {t('modal.remove')}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
