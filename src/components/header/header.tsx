/* eslint-disable no-use-before-define */
import "./header.scss";
import React from "react";
import Navbar from "./navbar/navbar";
import logoImg from "../../assets/images/Logotype.svg";

function Header(): JSX.Element {
  return (
    <header className="header-container">
      <h1 className="header-container__logo">
        <img src={logoImg} alt="logo" />
      </h1>
      <Navbar />
    </header>
  );
}

export default React.memo(Header);
