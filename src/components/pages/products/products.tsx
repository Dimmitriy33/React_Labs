import IGame from "@/models/productModel";
import debounce from "@/helpers/debounce";
import { useEffect, useState } from "react";
import {
  getFilteredAndSortedProducts,
  getProductsByCategory,
  getProductsList,
  searchProducts,
} from "@/api/apiProducts";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import ProductsGrid from "../../products/productsGrid/productsGrid";
import "./products.scss";

interface SelectorModel {
  value: string;
  label: string;
}

const Products = (): JSX.Element => {
  const params = useLocation().search;
  const category = new URLSearchParams(params).get("category");
  const [searchInput, setSearchInput] = useState<string>("");
  const [products, setProducts] = useState<Array<IGame>>(new Array<IGame>());
  const [loader, toggleLoader] = useState<boolean>(false);

  const [sortField, setSortField] = useState<SelectorModel | null>(null);
  const [orderType, setOrderType] = useState<SelectorModel | null>(null);
  const [filterType, setFilterType] = useState<SelectorModel | null>(null);
  const [filterValue, setFilterValue] = useState<SelectorModel | null>(null);

  const [filterValueOptions, setfilterValueOptions] = useState([{ value: "", label: "" }]);

  const sortFieldOptions = [
    { value: "Name", label: "Name" },
    { value: "Rating", label: "Rating" },
    { value: "Price", label: "Price" },
  ];

  const filterTypeOptions = [
    { value: "", label: "" },
    { value: "Genre", label: "Genre" },
    { value: "Age", label: "Age" },
  ];

  const ordertypeOptions = [
    { value: "Asc", label: "Asc" },
    { value: "Desc", label: "Desc" },
  ];

  const productsByInput = async () => {
    setProducts(await searchProducts(searchInput));
  };

  const productsList = async () => {
    setProducts(await getProductsList());
  };

  const productsByCategory = async () => {
    if (category) {
      setProducts(await getProductsByCategory(category || ""));
    } else {
      setProducts(await getProductsList());
    }
  };

  const onFilterSubmit = async () => {
    const result = await getFilteredAndSortedProducts(
      (sortField as SelectorModel) == null || (sortField as SelectorModel).value === "Name"
        ? ""
        : ((sortField as SelectorModel).value as string),
      (orderType as SelectorModel) == null ? "Asc" : ((orderType as SelectorModel).value as string),
      (filterType as SelectorModel) == null ? "" : ((filterType as SelectorModel).value as string),
      (filterValue as SelectorModel) == null ? "" : ((filterValue as SelectorModel).value as string)
    );

    if (result >= 400) {
      Swal.fire({
        title: "Error",
        text: "Invalid filter attempt!",
        icon: "error",
      });
    } else if (category) {
      setProducts(await getProductsByCategory(category, result as IGame[]));
    } else {
      setProducts(result as IGame[]);
    }

    setSortField(null);
    setOrderType(null);
    setFilterType(null);
    setFilterValue(null);
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

  useEffect(() => {
    if (filterType && ((filterType as SelectorModel).value as string) === "Genre") {
      setfilterValueOptions([
        { value: "", label: "" },
        { value: "RolePlaying", label: "RolePlaying" },
        { value: "Action", label: "Action" },
        { value: "Strategy", label: "Strategy" },
        { value: "Simulation", label: "Simulation" },
        { value: "Esports", label: "Esports" },
        { value: "MMO", label: "MMO" },
        { value: "Adventure", label: "Adventure" },
      ]);
    } else if (filterType && ((filterType as SelectorModel).value as string) === "Age") {
      setfilterValueOptions([
        { value: "", label: "" },
        { value: "0", label: "0" },
        { value: "6", label: "6" },
        { value: "12", label: "12" },
        { value: "16", label: "16" },
      ]);
    } else {
      setfilterValueOptions([{ value: "", label: "" }]);
    }
    setFilterValue(null);
  }, [filterType]);

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
      <div className="products-container">
        <div className="products-container__filter">
          {category && <h2>Category: {category.toUpperCase()}</h2>}
          <div className="products-container__filter__box">
            <h2>Sort</h2>
            <Select
              placeholder="Choose sort field"
              value={sortField}
              className="select-input"
              onChange={setSortField}
              options={sortFieldOptions}
            />
            <Select
              className="select-input"
              placeholder="Choose filter criteria"
              value={filterType}
              onChange={setFilterType}
              options={filterTypeOptions}
            />
            <Select
              className="select-input"
              placeholder="Choose filter criteria value"
              value={filterValue}
              onChange={setFilterValue}
              options={filterValueOptions}
            />
            <Select
              className="select-input"
              placeholder="Choose filter order type"
              value={orderType}
              onChange={setOrderType}
              options={ordertypeOptions}
            />
          </div>
          <button type="button" className="filter-button" onClick={onFilterSubmit}>
            filter
          </button>
        </div>
        <div className="products-container__products">
          {loader && <div className="lds-hourglass" />}
          <ProductsGrid games={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
