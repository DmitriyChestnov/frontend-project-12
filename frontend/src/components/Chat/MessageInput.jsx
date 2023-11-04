import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import { useAuth, useSocket } from '../../hooks/index.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { messageShema } from '../../validate.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    channelsSelectors.selectCurrentChannelId,
  );
  const inputMessage = useRef(null);
  const auth = useAuth();
  const socket = useSocket();
  const rollbar = useRollbar();

  const formik = useFormik({
    initialValues: { messageText: '' },

    validationSchema: messageShema(t('messageCannotEmpty')),

    onSubmit: async (values, { resetForm }) => {
      const message = {
        body: values.messageText,
        channelId: currentChannelId,
        user: auth.user.username,
      };
      try {
        await socket.sendMessage(message);
        resetForm();
      } catch (error) {
        toast.error(t('errors.message'));
        rollbar.error('SendMessage', error);
      }
    },
  });

  useEffect(() => {
    if (inputMessage.current) {
      inputMessage.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    if (formik.values.messageText === '') {
      inputMessage.current.focus();
    }
  }, [formik.values.messageText]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        onSubmit={formik.handleSubmit}
        className="py-1 border rounded-2"
      >
        <InputGroup hasValidation={!formik.dirty || !formik.isValid}>
          <Form.Control
            ref={inputMessage}
            className="border-0 p-0 ps-2"
            name="messageText"
            type="text"
            placeholder={t('placeholders.newMessage')}
            aria-label={t('newMessage')}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            value={formik.values.messageText}
          />

          <Button
            variant="light"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            <ArrowRightSquare size={20} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
