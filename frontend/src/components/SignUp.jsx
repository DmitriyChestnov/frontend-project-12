import { useFormik } from 'formik';
import {
  Card, Form, Button, Row, Col, Container, Image,
} from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import img from '../assets/registrate.jpg';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import { SignupSchema } from '../validate.js';

const SignUp = () => {
  const { t } = useTranslation();
  const [regError, setRegError] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const inputName = useRef(null);
  const rollbar = useRollbar();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: SignupSchema(
      t('regRules.name'),
      t('regRules.password'),
      t('regRules.passwordEquality'),
      t('errors.required'),
    ),

    onSubmit: async ({ username, password }) => {
      setRegError(false);
      try {
        const { data } = await axios.post(routes.signUp(), {
          username,
          password,
        });
        logIn(data);
        navigate(routes.chatPage());
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          toast.error(t('errors.network'));
        }
        if (error.response.status === 409) {
          setRegError(true);
        }
        rollbar.error('signUp', error);
      }
    },
  });

  useEffect(() => {
    if (inputName.current) {
      inputName.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputName.current && regError) {
      inputName.current.select();
    }
  }, [regError]);

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;
  const isInvalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="text-center Login-card shadow">
            <Row>
              <Col className="col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} roundedCircle />
              </Col>
              <Col className="col-form d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="mt-4">
                  <h1>{t('makeRegistration')}</h1>
                </Card.Title>
                <Form onSubmit={formik.handleSubmit} className="w-75">
                  <fieldset disabled={formik.isSubmitting}>
                    <Form.Floating className="mb-4 align-self-center">
                      <Form.Control
                        required
                        type="text"
                        name="username"
                        id="username"
                        placeholder={t('placeholders.username')}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={regError || isInvalidUsername}
                        ref={inputName}
                        isValid={
                          formik.touched.username && !formik.errors.username
                        }
                        onBlur={formik.handleBlur}
                      />
                      <Form.Label htmlFor="name">
                        {t('placeholders.username')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder={t('placeholders.password')}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={regError || isInvalidPassword}
                        isValid={
                          formik.touched.password && !formik.errors.password
                        }
                        onBlur={formik.handleBlur}
                      />
                      <Form.Label htmlFor="password">
                        {t('placeholders.password')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        required
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder={t('placeholders.confirmPassword')}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        isInvalid={regError || isInvalidConfirmPassword}
                        isValid={
                          formik.touched.confirmPassword && !formik.errors.confirmPassword
                        }
                        onBlur={formik.handleBlur}
                      />
                      <Form.Label htmlFor="confirmPassword">
                        {t('placeholders.confirmPassword')}
                      </Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword || t('errors.userExist')}
                      </Form.Control.Feedback>
                    </Form.Floating>
                    <div className="d-grid">
                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="mb-4"
                      >
                        {t('register')}
                      </Button>
                    </div>
                  </fieldset>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
