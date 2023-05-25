import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link to={"/"} className="button login__submit">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
