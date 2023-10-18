import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import entry from '../assets/login.jpg';

const validationSchema = yup.object().shape({
  username: yup.string().trim(),
  password: yup.string().trim(),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
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
                    placeholder="Ваш ник"
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    required
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                  />
                </Form.Group>
                <Button active="false" className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                { ' ' }
                <Link to="/login">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
