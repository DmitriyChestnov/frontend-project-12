import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">404</h1>
    <h2 className="h4 text-muted">Страница не найдена</h2>
    <p className="text-muted">
      Но вы можете перейти
      <Link to="/login">на главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
