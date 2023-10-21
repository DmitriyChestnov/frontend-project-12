import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/index.jsx';
import entry from '../assets/login.jpg';
import routes from '../routes.js';

const useSubmit = (setAuthFailed) => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  return async (values) => {
    setAuthFailed(false);
    try {
      const { data } = await axios.post(routes.getLogin(), values);
      if (data.token) {
        const user = { token: data.token, username: data.username };
        logIn(user);
        navigate(routes.chatPage);
      }
    } catch (error) {
      if (!error.isAxiosError) {
        toast.error('неизвестная ошибка');
      }
      if (error.isAxiosError && error.response?.status === 401) {
        setAuthFailed(true);
        inputRef.current.select();
      } else {
        toast.error('Ошибка соединения');
      }
    }
  };
};

const Login = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().trim()
      .required()
      .min(3)
      .max(20),
    password: yup.string().trim()
      .required()
      .min(6),
  });

  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: useSubmit(setAuthFailed),
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={entry}
                  alt="Войти"
                  className="rounded-circle"
                />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Ваш ник"
                    autoComplete="username"
                    required
                    autoFocus
                    isInvalid={authFailed || (formik.touched.username && formik.errors.username)}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    autoComplete="current-password"
                    required
                    isInvalid={authFailed || (formik.touched.password && formik.errors.password)}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Form.Group>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                { ' ' }
                <Link to={routes.signupPage}>Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
