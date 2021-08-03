import IGame from "@/api/productModel";
import { useEffect, useState } from "react";
import ProductsGrid from "../products/productsGrid";
import getTopProducts from "../../api/apiProducts";
import "./home.scss";
import CategoriesCards from "../products/categories";

const Categories = ["Pc", "Playstation", "Xbox", "Mobile", "Nintendo"];

function Home(): JSX.Element {
  const [products, setProducts] = useState<Array<IGame>>(new Array<IGame>());

  const topProducts = async () => {
    setProducts(await getTopProducts(3));
  };

  useEffect(() => {
    topProducts();
  }, []);

  return (
    <div className="homePage-container">
      <div className="homePage-container__products">
        <h2>Categories</h2>
        <CategoriesCards names={Categories} />
        <h2>New Products</h2>
        <ProductsGrid games={products} />
      </div>
    </div>
  );
}

export default Home;
