import IGame from "@/models/productModel";
import { addGameToCartAsync } from "@/redux/actions/orderActions";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import { IOrder } from "@/redux/types/orderState";
import moment from "moment";
import { useDispatch } from "react-redux";
import "./card.scss";

interface CardProps {
  game: IGame;
}

export default function Card(props: CardProps): JSX.Element {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.userReducer.user);

  const addGameToCart = () => {
    dispatch(
      addGameToCartAsync({
        key: props.game.id,
        name: props.game.name,
        amount: 1,
        date: moment().format("YYYY-MM-DD HH:MM:SS"),
        address: user.addressDelivery,
        price: props.game.price,
      } as IOrder)
    );
  };

  return (
    <button type="button" onClick={addGameToCart}>
      <div className="card-container">
        <img src={props.game.logo} alt="logo" />
        <p className="card-container__title">{props.game.name}</p>
      </div>
    </button>
  );
}
