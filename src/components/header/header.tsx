/* eslint-disable no-use-before-define */
import "./header.scss";
import React from "react";
import Navbar from "./navbar/navbar";
import logoImg from "../../assets/images/Logotype.svg";

const Logo = () => (
  <div className="headerContainer-logo">
    <img src={logoImg} alt="logo" />
  </div>
);

class Header extends React.PureComponent {
  render(): JSX.Element {
    return (
      <header className="headerContainer">
        <Logo />
        <Navbar />
      </header>
    );
  }
}

export default Header;
