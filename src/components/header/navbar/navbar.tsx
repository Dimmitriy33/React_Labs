import { NavLink as Link } from "react-router-dom";
import "./navbar.scss";

function NavBar(): JSX.Element {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul>
          <li className="navbar-link">
            <Link to="/home">Home</Link>
          </li>
          <li className="navbar-link">
            <Link to="/products">Products</Link>
            <ul className="navbar-dropdown">
              <li className="navbar-link">
                <Link to="/products">Among Us</Link>
              </li>
              <li className="navbar-link">
                <Link to="/products">Brawl stars</Link>
              </li>
              <li className="navbar-link">
                <Link to="/products">Half-Life</Link>
              </li>
            </ul>
          </li>
          <li className="navbar-link">
            <Link to="/basket">Basket</Link>
          </li>
          <li className="navbar-link">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-btn">
        <button type="button">
          <Link className="navbar-btn-link" to="/sign-in">
            Sign In
          </Link>
        </button>
        <button type="button">
          <Link className="navbar-btn-link" to="/sign-up">
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
