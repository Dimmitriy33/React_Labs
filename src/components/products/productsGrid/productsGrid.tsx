import IGame from "@/redux/types/productState";
import { useState } from "react";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import Modal from "@/elements/modal";
import Card from "../card/card";
import "./productsGrid.scss";
import addPicture from "../../../assets/images/icons/newGame.png";
import Upsert, { UpsertOperation } from "../modals/upsert/upsert";

interface ProductsGridProps {
  games: IGame[];
}

export default function ProductsGrid(props: ProductsGridProps): JSX.Element {
  const [showUpsertModal, toggleUpsertModal] = useState<boolean>(false);
  const [upsertOperation, setUpsertOperation] = useState<UpsertOperation>(UpsertOperation.create);

  const user = useTypedSelector((state) => state.userReducer.user);

  const addGame = () => {
    setUpsertOperation(UpsertOperation.create);
    toggleUpsertModal(true);
    console.log("add");
  };

  return (
    <div className="productsGrid-container">
      {user.isAdmin && (
        <button type="button" className="addGame-button" onClick={addGame}>
          <div className="card-container">
            <img src={addPicture} alt="addGamePicture" />
            <p className="card-container__title">add game</p>
          </div>
          {showUpsertModal && (
            <Modal closeCallback={() => toggleUpsertModal(false)}>
              <Upsert game={undefined} operation={upsertOperation} closeCallback={() => toggleUpsertModal(false)} />
            </Modal>
          )}
        </button>
      )}
      {props.games.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </div>
  );
}
