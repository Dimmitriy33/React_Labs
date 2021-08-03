import IGame from "@/api/productModel";
import debounce from "@/helpers/debounce";
import { useEffect, useState } from "react";
import ProductsGrid from "../products/productsGrid";
import LoadingGif from "../../assets/images/icons/loadingGif.gif";
import "./home.scss";

function Home(): JSX.Element {
  const [products, setProducts] = useState<Array<IGame>>(new Array<IGame>());

  useEffect(() => {
    fetch(`http://localhost:8000/api/games/list?SortField=Rating&limit=3&ordertype=Desc`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="homePage-container">
      <div className="homePage-container__products">
        <h2>New Products</h2>
        <ProductsGrid games={products} />
      </div>
    </div>
  );
}

export default Home;
