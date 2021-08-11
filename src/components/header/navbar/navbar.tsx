import { NavLink as Link, useHistory } from "react-router-dom";
import "./navbar.scss";
import { useState } from "react";
import Modal from "@/elements/modal";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import { useDispatch } from "react-redux";
import { logoutAsync } from "@/redux/actions/userActions";
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
  const isAuth = useTypedSelector((state) => state.user.isAuthenticated);
  const username = useTypedSelector((state) => state.user.user.userName);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="navbar-container__btn">
      {!isAuth ? (
        <button type="button" onClick={() => toggleSignInModal(true)}>
          Sign In
        </button>
      ) : (
        <Link className="profile_link" to={Routes.Profile}>
          {username}
        </Link>
      )}

      {showSignInModal ? (
        <Modal closeCallback={() => toggleSignInModal(false)}>
          <SignIn closeCallback={() => toggleSignInModal(false)} />
        </Modal>
      ) : null}

      {showSignUpModal ? (
        <Modal closeCallback={() => toggleSignUpModal(false)}>
          <SignUp closeCallback={() => toggleSignUpModal(false)} />
        </Modal>
      ) : null}

      {!isAuth ? (
        <button type="button" onClick={() => toggleSignUpModal(true)}>
          Sign Up
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            dispatch(logoutAsync());
            toggleSignInModal(false);
            toggleSignUpModal(false);
            history.push(Routes.Home);
          }}
        >
          Sign Out
        </button>
      )}
    </div>
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
