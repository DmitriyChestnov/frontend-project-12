import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../routes';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="text-center">
          <p className="display-1">{t('codeNotFound')}</p>
          <p className="display-5 mb-4">{t('pageNotFound')}</p>
          <Button
            variant="outline-primary "
            onClick={() => navigate(appPaths.chat)}
          >
            {t('goMainPage')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
