import { Container, Navbar, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { appPaths } from '../../routes';
import { useAuth } from '../../hooks';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={appPaths.chat}>{t('name')}</Navbar.Brand>
        {auth.user ? (
          <Button
            href={appPaths.login}
            variant="outline-primary"
            onClick={auth.logOut}
          >
            {t('exit')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
