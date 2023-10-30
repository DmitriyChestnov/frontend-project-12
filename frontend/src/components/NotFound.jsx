import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">404</h1>
      <h2 className="h4 text-muted">{t('notFound')}</h2>
      <p className="text-muted">
        {t('CanGo')}
        { ' ' }
        <Link to="/login">{t('toMainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
