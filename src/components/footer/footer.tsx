import "./footer.scss";
import EAIcon from "../../assets/images/icons/eaIcon.png";
import ValveIcon from "../../assets/images/icons/valveIcon.jpg";
import EpicIcon from "../../assets/images/icons/epicGamesIcon.png";
import NintendoIcon from "../../assets/images/icons/nintendoIcon.png";

const FooterTitle = () => <p className="footer-container__title">Incredible convenient</p>;

const CompaniesIcon = () => (
  <div className="footer-container__icons">
    <a href="https://www.ea.com/">
      <img src={EAIcon} className="footer-container__icons__square" alt="eaIcon" />
    </a>
    <a href="https://www.valvesoftware.com/en">
      <img src={ValveIcon} className="footer-container__icons__rect" alt="valveIcon" />
    </a>
    <a href="https://www.epicgames.com/store/en-US">
      <img src={EpicIcon} className="footer-container__icons__square" alt="epicIcon" />
    </a>
    <a href="https://www.nintendo.com">
      <img src={NintendoIcon} className="footer-container__icons__rect" alt="nintendoIcon" />
    </a>
  </div>
);

const Footer = (): JSX.Element => (
  <footer className="footer-container">
    <FooterTitle />
    <CompaniesIcon />
  </footer>
);

export default Footer;
