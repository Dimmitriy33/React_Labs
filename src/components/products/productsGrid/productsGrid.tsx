import IGame from "@/redux/types/productState";
// eslint-disable-next-line no-use-before-define
import React, { useState } from "react";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import Modal from "@/elements/modal";
import Card from "../card/card";
import "./productsGrid.scss";
import addPicture from "../../../assets/images/icons/newGame.png";
import Upsert, { UpsertOperation } from "../modals/upsert/upsert";

interface ProductsGridProps {
  games: IGame[];
  updateProducts: () => Promise<void>;
}

function ProductsGrid(props: ProductsGridProps): JSX.Element {
  const [showUpsertModal, toggleUpsertModal] = useState<boolean>(false);
  const [upsertOperation, setUpsertOperation] = useState<UpsertOperation>(UpsertOperation.create);

  const user = useTypedSelector((state) => state.userReducer.user);

  const addGame = () => {
    setUpsertOperation(UpsertOperation.create);
    toggleUpsertModal(true);
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
              <Upsert
                game={undefined}
                operation={upsertOperation}
                closeCallback={() => toggleUpsertModal(false)}
                updateProducts={props.updateProducts}
              />
            </Modal>
          )}
        </button>
      )}
      {props.games.map((game) => (
        <Card key={game.id} game={game} updateProducts={props.updateProducts} />
      ))}
    </div>
  );
}

export default React.memo(ProductsGrid);
