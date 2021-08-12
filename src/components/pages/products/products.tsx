import getProductsByCategory from "@/api/apiProductsByCategory";
import IGame from "@/models/productModel";
import debounce from "@/helpers/debounce";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductsGrid from "../../products/productsGrid/productsGrid";
import "./products.scss";

const Products = (): JSX.Element => {
  const params = useLocation().search;
  const category = new URLSearchParams(params).get("category");
  const [searchInput, setSearchInput] = useState<string>("");
  const [products, setProducts] = useState<Array<IGame>>(new Array<IGame>());
  const [loader, toggleLoader] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput !== "") {
      fetch(`/api/games/search?term=${searchInput}&limit=100&offset=0`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        });
    } else {
      fetch(`/api/games/list`)
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }
    toggleLoader(false);
  }, [searchInput]);

  const productsByCategory = async () => {
    if (category) {
      setProducts(await getProductsByCategory(category || ""));
    }
  };

  useEffect(() => {
    productsByCategory();
  }, [category]);

  return (
    <div className="productPage-container">
      <div className="productPage-container__search">
        <h2>Search: </h2>
        <input
          className="productPage-container__search__text"
          type="text"
          onChange={(event) => {
            toggleLoader(true);
            debounce(() => {
              setSearchInput(event.target.value);
            }, 500);
          }}
        />
      </div>
      {loader && <div className="lds-hourglass" />}
      <ProductsGrid games={products} />
    </div>
  );
};

export default Products;
