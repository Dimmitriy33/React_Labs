import IGame from "@/models/productModel";
import debounce from "@/helpers/debounce";
import { useEffect, useState } from "react";
import { getProductsByCategory, getProductsList, searchProducts } from "@/api/apiProducts";
import { useLocation } from "react-router-dom";
import ProductsGrid from "../../products/productsGrid/productsGrid";
import "./products.scss";

const Products = (): JSX.Element => {
  const params = useLocation().search;
  const category = new URLSearchParams(params).get("category");
  const [searchInput, setSearchInput] = useState<string>("");
  const [products, setProducts] = useState<Array<IGame>>(new Array<IGame>());
  const [loader, toggleLoader] = useState<boolean>(false);

  const productsByInput = async () => {
    setProducts(await searchProducts(searchInput));
  };

  const productsList = async () => {
    setProducts(await getProductsList());
  };

  const productsByCategory = async () => {
    if (category) {
      setProducts(await getProductsByCategory(category || ""));
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      productsByInput();
    } else {
      productsList();
    }
    toggleLoader(false);
  }, [searchInput]);

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
