import { Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import {
  Container, Form, Row, Card, Col, Button, Image,
} from 'react-bootstrap';

import { SigninSchema } from '../validate.js';
import img from '../assets/login.jpg';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const ref = useRef(null);
  const rollbar = useRollbar();

  const onSubmit = async (values) => {
    setAuthFailed(false);
    try {
      const { data } = await axios.post(routes.login(), values);
      logIn(data);
      navigate(routes.chatPage());
    } catch (err) {
      if (err.isAxiosError) {
        if (err.response.status === 401) {
          setAuthFailed(true);
        }
        if (err.code === 'ERR_NETWORK') {
          toast.error(t('errors.network'));
        }
      }
      rollbar.error('Login', err);
      throw err;
    }
  };

  return (
    <Container fluid className="h-100 ">
      <Row className="row justify-content-center align-items-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="text-center Login-card shadow">
            <Row>
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} alt="login" roundedCircle />
              </Col>
              <Col className="col-form">
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={SigninSchema(t('errors.required'))}
                  className="w-100"
                  onSubmit={onSubmit}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                  }) => {
                    const isInvalidUsername = touched.username && errors.username;
                    const isInvalidPassword = touched.password && errors.password;
                    return (
                      <Form
                        onSubmit={handleSubmit}
                        className="col-12 col-md-11 mt-3 mt-mb-0"
                      >
                        <h1>{t('entry')}</h1>
                        <Form.Floating md="11" className="mb-2">
                          <Form.Control
                            required
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={authFailed || isInvalidUsername}
                            id="username"
                            placeholder={t('placeholders.yourNickname')}
                            ref={ref}
                            onBlur={handleBlur}
                          />
                          <Form.Label htmlFor="username">
                            {t('placeholders.yourNickname')}
                          </Form.Label>
                          {isInvalidUsername ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Floating>
                        <Form.Floating md="11">
                          <Form.Control
                            required
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={authFailed || isInvalidPassword}
                            id="password"
                            placeholder={t('placeholders.password')}
                            onBlur={handleBlur}
                          />
                          <Form.Label htmlFor="password">
                            {t('placeholders.password')}
                          </Form.Label>
                          {isInvalidPassword ? (
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          ) : null}
                          {authFailed ? (
                            <Form.Control.Feedback type="invalid">
                              {t('invalidFeedback')}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Floating>
                        <div className="d-grid gap-2 mb-4">
                          <Button
                            variant="outline-primary"
                            className="Login-button mt-3"
                            type="submit"
                          >
                            {t('entry')}
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
            <Card.Footer className="p-4">
              {t('noAccount')}
              {' '}
              <Link to={routes.signUpPage()} className="footer-link">
                {t('makeRegistration')}
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
