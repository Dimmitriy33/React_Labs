import { NavLink as Link, useHistory } from "react-router-dom";
import "./navbar.scss";
// eslint-disable-next-line no-use-before-define
import React, { Suspense, useState } from "react";
import Modal from "@/elements/modal";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import { useDispatch } from "react-redux";
import { Categories } from "@/constants/sortAndFilter";
import { logoutAsync } from "@/redux/actions/userActions";
import * as Routes from "../../../constants/routes";

const SignIn = React.lazy(() => import("../../users/signIn/signIn"));
const SignUp = React.lazy(() => import("../../users/signUp/signUp"));

const Menu = () => (
  <nav className="navbar-container__menu">
    <ul>
      <li>
        <Link to={Routes.Home}>Home</Link>
      </li>
      <li>
        <div className="dropdown">
          <button type="button" className="dropbtn">
            Products
          </button>
          <div className="dropdown-content">
            {Categories.map((category) => (
              <Link key={category} to={`${Routes.ProductsCategory}=${category}`}>
                {category}
              </Link>
            ))}
          </div>
        </div>
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
  const isAuth = useTypedSelector((state) => state.userReducer.isAuthenticated);
  const username = useTypedSelector((state) => state.userReducer.user.userName);
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

      {showSignInModal && (
        <Modal closeCallback={() => toggleSignInModal(false)}>
          <SignIn closeCallback={() => toggleSignInModal(false)} />
        </Modal>
      )}

      {showSignUpModal && (
        <Modal closeCallback={() => toggleSignUpModal(false)}>
          <SignUp closeCallback={() => toggleSignUpModal(false)} />
        </Modal>
      )}

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
      <Suspense fallback={<div>Loading...</div>}>
        <AuthButtons />
      </Suspense>
    </div>
  );
}

export default NavBar;
