import IGame from "@/models/productModel";
import Card from "../card/card";
import "./productsGrid.scss";

interface ProductsGridProps {
  games: Array<IGame>;
}

const ProductsGrid = (props: ProductsGridProps): JSX.Element => (
  <div className="productsGrid-container">
    {props.games.map((game) => (
      <Card key={game.id} game={game} />
    ))}
  </div>
);

export default ProductsGrid;
