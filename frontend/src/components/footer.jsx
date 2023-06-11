import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top container">
        <p className="col-md-4 mb-0 text-muted">
          © 2023, Social <i className="bi bi-chat-left-text-fill"></i> Spark
        </p>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to={"/"} className="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/about"} className="nav-link px-2 text-muted">
              About
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/contactUs"} className="nav-link px-2 text-muted">
              Contact Us
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};
export default Footer;
