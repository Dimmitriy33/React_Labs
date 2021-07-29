import "./footer.scss";
// eslint-disable-next-line no-use-before-define
import React from "react";
import EAIcon from "../../assets/images/icons/eaIcon.png";
import ValveIcon from "../../assets/images/icons/valveIcon.jpg";
import EpicIcon from "../../assets/images/icons/epicGamesIcon.png";
import NintendoIcon from "../../assets/images/icons/nintendoIcon.png";

const FooterTitle = () => <p className="footer-title">Incredible convenient</p>;

const CompaniesIcon = () => (
  <div className="footer-icons">
    <a href="https://www.ea.com/">
      <img src={EAIcon} className="footer-icons-square" alt="eaIcon" />
    </a>
    <a href="https://www.valvesoftware.com/en">
      <img src={ValveIcon} className="footer-icons-rect" alt="valveIcon" />
    </a>
    <a href="https://www.epicgames.com/store/en-US">
      <img src={EpicIcon} className="footer-icons-square" alt="epicIcon" />
    </a>
    <a href="https://www.nintendo.com">
      <img src={NintendoIcon} className="footer-icons-rect" alt="nintendoIcon" />
    </a>
  </div>
);

class Footer extends React.PureComponent {
  render(): JSX.Element {
    return (
      <footer className="footer-container">
        <FooterTitle />
        <CompaniesIcon />
      </footer>
    );
  }
}

export default Footer;
