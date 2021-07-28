import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header";

import HomePage from "./components/pages/home";
import ProductsPage from "./components/pages/products";
import BasketPage from "./components/pages/basket";
import SignIn from "./components/pages/signIn";
import SignUp from "./components/pages/signUp";

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Redirect exact from="*" to="/home" />
      <Route path="/home" component={HomePage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/basket" component={BasketPage} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
    </Switch>
  </Router>
);
ReactDom.render(<App />, document.getElementById("app"));
