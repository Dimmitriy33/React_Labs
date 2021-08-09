import { NavLink as Link } from "react-router-dom";
import "./navbar.scss";
import { useState } from "react";
import Modal from "@/elements/modal";
import UserContext from "@/components/users/userContext";
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

function AuthButtons(): JSX.Element {
  const [showSignInModal, toggleSignInModal] = useState<boolean>(false);
  const [showSignUpModal, toggleSignUpModal] = useState<boolean>(false);

  return (
    <UserContext.Consumer>
      {(userCtx) => (
        <div className="navbar-container__btn">
          {!userCtx?.isAiuthenticated ? (
            <button type="button" onClick={() => toggleSignInModal(true)}>
              Sign In
            </button>
          ) : (
            <h2>{userCtx?.user.userName}</h2>
          )}

          {showSignInModal ? (
            <Modal closeCallback={() => toggleSignInModal(false)}>
              <SignIn />
            </Modal>
          ) : null}

          {showSignUpModal ? (
            <Modal closeCallback={() => toggleSignUpModal(false)}>
              <SignUp />
            </Modal>
          ) : null}

          {!userCtx?.isAiuthenticated ? (
            <button type="button" onClick={() => toggleSignUpModal(true)}>
              Sign Up
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                userCtx && userCtx.logout();
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </UserContext.Consumer>
  );
}

function NavBar(): JSX.Element {
  return (
    <div className="navbar-container">
      <Menu />
      <AuthButtons />
    </div>
  );
}

export default NavBar;
