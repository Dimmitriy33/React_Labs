import { NavLink as Link } from "react-router-dom";
import "./navbar.scss";
import { useState } from "react";
import SignIn from "../../users/signIn/signIn";
import SignUp from "../../users/signUp/signUp";
import * as Routes from "../../../constants/routes";

const Menu = () => (
  <nav className="navbar-container__menu">
    <ul>
      <li>
        <Link to={Routes.Home}>Home</Link>
      </li>
      <li>
        <Link to={Routes.Products}>Products</Link>
        <ul className="navbar-container__menu__dropdown">
          <li>
            <Link to={`${Routes.ProductsCategory}=pc`}>PC</Link>
          </li>
          <li>
            <Link to={`${Routes.ProductsCategory}=playstation`}>Playstation</Link>
          </li>
          <li>
            <Link to={`${Routes.ProductsCategory}=xbox`}>Xbox</Link>
          </li>
          <li>
            <Link to={`${Routes.ProductsCategory}=mobile`}>Mobile</Link>
          </li>
          <li>
            <Link to={`${Routes.ProductsCategory}=nintendo`}>Nintendo</Link>
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
);

const AuthButtons = () => {
  const [showSignInModal, toggleSignInModal] = useState<boolean>(false);
  const [showSignUpModal, toggleSignUpModal] = useState<boolean>(false);

  return (
    <div className="navbar-container__btn">
      <button type="button" onClick={() => toggleSignInModal(true)}>
        Sign In
      </button>
      {showSignInModal ? <SignIn closeCallback={() => toggleSignInModal(false)} /> : null}

      <button type="button" onClick={() => toggleSignUpModal(true)}>
        Sign Up
      </button>
      {showSignUpModal ? <SignUp closeCallback={() => toggleSignUpModal(false)} /> : null}
    </div>
  );
};

function NavBar(): JSX.Element {
  return (
    <div className="navbar-container">
      <Menu />
      <AuthButtons />
    </div>
  );
}

export default NavBar;
