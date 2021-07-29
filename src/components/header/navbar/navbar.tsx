import { NavLink as Link } from "react-router-dom";
import "./navbar.scss";
import * as Routes from "../../constants/routes";

function NavBar(): JSX.Element {
  return (
    <div className="navbar-container">
      <nav className="navbar-container__menu">
        <ul>
          <li>
            <Link to={Routes.Home}>Home</Link>
          </li>
          <li>
            <Link to={Routes.Products}>Products</Link>
            <ul className="navbar-container__menu__dropdown">
              <li>
                <Link to={Routes.Products}>Among Us</Link>
              </li>
              <li>
                <Link to={Routes.Products}>Brawl stars</Link>
              </li>
              <li>
                <Link to={Routes.Products}>Half-Life</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={Routes.Basket}>Basket</Link>
          </li>
          <li>
            <Link to={Routes.About}>About</Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-container__btn">
        <button type="button">
          <Link className="navbar-container__btn__link" to={Routes.SignIn}>
            Sign In
          </Link>
        </button>
        <button type="button">
          <Link className="navbar-container__btn__link" to={Routes.SignUp}>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
