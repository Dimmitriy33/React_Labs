import IGame from "@/api/productModel";
import "./card.scss";

interface CardProps {
  game: IGame;
}

const Card: React.FC<CardProps> = ({ game: { name, logo } }) => (
  <div className="card-container">
    <img src={logo} alt="logo" />
    <p className="card-container__title">{name}</p>
  </div>
);

export default Card;
