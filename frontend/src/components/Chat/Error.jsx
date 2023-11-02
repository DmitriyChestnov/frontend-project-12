import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { apiRoutes } from '../../routes';
import { useAuth } from '../../hooks';

const Error = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const { errorCode, errorMessage } = useSelector(
    (state) => state.channels.error,
  );

  const handleAuthError = () => {
    navigate(apiRoutes.login);
    logOut();
  };

  const handleOtherError = () => {
    navigate(0);
  };

  return (
    <div className="m-auto w-auto text-center">
      <h3>{t('error')}</h3>
      <p>{errorMessage}</p>
      <Button onClick={errorCode === 401 ? handleAuthError : handleOtherError}>
        {errorCode === 401 ? t('reauthorization') : t('update')}
      </Button>
    </div>
  );
};

export default Error;
