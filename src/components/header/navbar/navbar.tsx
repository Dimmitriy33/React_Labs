import { NavLink as Link } from "react-router-dom";
import "./navbar.scss";

function NavBar(): JSX.Element {
  return (
    <nav className="navbar">
      <ul>
        <li className="navbar-link">
          <Link to="/home">Home</Link>
        </li>
        <li className="navbar-link">
          <Link to="/products">Products</Link>
        </li>
        <li className="navbar-link">
          <Link to="/basket">Basket</Link>
        </li>
      </ul>
      <div className="navbar-btn">
        <button type="button">
          <Link className="navbar-link" to="/sign-in">
            Sign In
          </Link>
        </button>
        <button type="button">
          <Link className="navbar-link" to="/sign-up">
            Sign Up
          </Link>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
