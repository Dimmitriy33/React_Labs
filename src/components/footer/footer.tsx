// eslint-disable-next-line no-use-before-define
import React from "react";
import "./footer.scss";
import EAIcon from "../../assets/images/icons/eaIcon.png";
import ValveIcon from "../../assets/images/icons/valveIcon.jpg";
import EpicIcon from "../../assets/images/icons/epicGamesIcon.png";
import NintendoIcon from "../../assets/images/icons/nintendoIcon.png";

interface IFooterItem {
  href: string;
  src: string;
  alt: string;
}

const FooterItems: IFooterItem[] = [
  {
    href: "https://www.ea.com/",
    src: EAIcon,
    alt: "eaIcon",
  },
  {
    href: "https://www.valvesoftware.com/en",
    src: ValveIcon,
    alt: "valveIcon",
  },
  {
    href: "https://www.epicgames.com/store/en-US",
    src: EpicIcon,
    alt: "epicIcon",
  },
  {
    href: "https://www.nintendo.com",
    src: NintendoIcon,
    alt: "nintendoIcon",
  },
];

const FooterTitle = () => <p className="footer-container__title">Incredible convenient</p>;

const CompaniesIcon = () => (
  <div className="footer-container__icons">
    {FooterItems.map((item) => (
      <a key={item.alt} href={item.href}>
        <img src={item.src} className="footer-container__icons__square" alt={item.alt} />
      </a>
    ))}
  </div>
);

function Footer(): JSX.Element {
  return (
    <footer className="footer-container">
      <FooterTitle />
      <CompaniesIcon />
    </footer>
  );
}

export default React.memo(Footer);
