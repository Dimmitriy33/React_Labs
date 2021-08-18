import { useEffect, useState } from "react";
import { getTopProducts } from "@/api/apiProducts";
import { Categories } from "@/constants/sortAndFilter";
import IGame from "@/redux/types/productState";
import ProductsGrid from "../../products/productsGrid/productsGrid";
import "./home.scss";
import CategoriesCards from "../../products/categoryCard/categories";

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
        <ProductsGrid games={products} updateProducts={topProducts} />
      </div>
    </div>
  );
}

export default Home;
