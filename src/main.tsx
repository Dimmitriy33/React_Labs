import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Routes from "./components/constants/routes";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import HomePage from "./components/pages/home";
import ProductsPage from "./components/pages/products";
import BasketPage from "./components/pages/basket";
import SignIn from "./components/pages/signIn";
import SignUp from "./components/pages/signUp";
import About from "./components/pages/about";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path={Routes.Home} component={HomePage} />
      <Route path={Routes.Products} component={ProductsPage} />
      <Route path={Routes.Basket} component={BasketPage} />
      <Route path={Routes.SignIn} component={SignIn} />
      <Route path={Routes.SignUp} component={SignUp} />
      <Route path={Routes.About} component={About} />
      <Redirect exact from="*" to={Routes.Home} />
    </Switch>
    <Footer />
  </Router>
);
ReactDom.render(<App />, document.getElementById("app"));
