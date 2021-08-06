/* eslint-disable no-use-before-define */
import "./header.scss";
import Navbar from "./navbar/navbar";
import logoImg from "../../assets/images/Logotype.svg";

const Header = (): JSX.Element => (
  <header className="header-container">
    <h1 className="header-container__logo">
      <img src={logoImg} alt="logo" />
    </h1>
    <Navbar />
  </header>
);

export default Header;
