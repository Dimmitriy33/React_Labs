import { Link } from "react-router-dom";
import "./categories.scss";
import * as Routes from "../constants/routes";

interface CategoriesProps {
  names: Array<string>;
}

interface CategoryProps {
  name: string;
}

const CategoryCard = (props: CategoryProps): JSX.Element => (
  <Link id={props.name} className="category-container" to={`${Routes.ProductsCategory}=playstation`}>
    <h1>{props.name}</h1>
  </Link>
);

const CategoriesCards = (props: CategoriesProps): JSX.Element => (
  <div className="categories-container">
    {props.names.map((name) => (
      <CategoryCard name={name} />
    ))}
  </div>
);

export default CategoriesCards;
