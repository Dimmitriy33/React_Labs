import IGame from "@/api/productModel";
import "./card.scss";

interface CardProps {
  game: IGame;
}

const Card = (props: CardProps): JSX.Element => (
  <div className="card-container">
    <img src={props.game.logo} alt="logo" />
    <p className="card-container__title">{props.game.name}</p>
  </div>
);

export default Card;
