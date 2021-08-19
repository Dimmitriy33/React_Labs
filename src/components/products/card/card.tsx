import { removeGame } from "@/api/apiProducts";
import Modal from "@/elements/modal";
import IGame from "@/models/productModel";
import { addGameToCartAsync } from "@/redux/actions/orderActions";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import { IOrder } from "@/redux/types/orderState";
import moment from "moment";
// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Upsert, { UpsertOperation } from "../modals/upsert/upsert";
import "./card.scss";

interface CardProps {
  game: IGame;
  updateProducts: () => Promise<void>;
}

function Card(props: CardProps): JSX.Element {
  const [showUpsertModal, toggleUpsertModal] = useState<boolean>(false);
  const [upsertOperation, setUpsertOperation] = useState<UpsertOperation>(UpsertOperation.create);

  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.userReducer.user);
  const token = useTypedSelector((state) => state.userReducer.token);

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
    Swal.fire({
      title: "Success",
      text: "Product added to the cart!",
      icon: "success",
    });
  };

  const removeGameSubmit = () => {
    const result = window.confirm("Are you sure to remove this game");
    if (result) {
      removeGame(props.game.id, token);
      props.updateProducts();
    }
  };

  const updateGame = () => {
    setUpsertOperation(UpsertOperation.update);
    toggleUpsertModal(true);
  };

  return !user.isAdmin ? (
    <button type="button" onClick={addGameToCart}>
      <div className="card-container">
        <img src={props.game.logo} alt="logo" />
        <p className="card-container__title">{props.game.name}</p>
      </div>
    </button>
  ) : (
    <div className="card-container">
      <img src={props.game.logo} alt="logo" />
      <p className="card-container__title">{props.game.name}</p>
      <div className="card-container__crud">
        <button className="button-submit" type="button" onClick={removeGameSubmit}>
          Remove
        </button>
        <button className="button-submit" type="button" onClick={updateGame}>
          Update
        </button>
      </div>
      {showUpsertModal && (
        <Modal closeCallback={() => toggleUpsertModal(false)}>
          <Upsert
            game={props.game}
            operation={upsertOperation}
            closeCallback={() => toggleUpsertModal(false)}
            updateProducts={props.updateProducts}
          />
        </Modal>
      )}
    </div>
  );
}

export default React.memo(Card);
