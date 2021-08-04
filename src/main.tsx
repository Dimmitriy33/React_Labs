import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React from "react";
import * as Routes from "./components/constants/routes";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import HomePage from "./components/pages/home";
import ProductsPage from "./components/pages/products";
import BasketPage from "./components/pages/basket";
import SignInPage from "./components/pages/signIn";
import SignUpPage from "./components/pages/signUp";
import AboutPage from "./components/pages/about";
import userContext from "./components/users/userContext";

class MainApp extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidCatch(error: Error) {
    alert(error);
    console.error("UI error:", error);
    window.location.assign(Routes.Home);
  }

  render() {
    return (
      <userContext.Provider value={this.state.user}>
        <Router>
          <Header />
          <Switch>
            <Route path={Routes.Home} component={HomePage} />
            <Route path={Routes.Products} component={ProductsPage} />
            <Route path={Routes.Basket} component={BasketPage} />
            <Route path={Routes.SignIn} component={SignInPage} />
            <Route path={Routes.SignUp} component={SignUpPage} />
            <Route path={Routes.About} component={AboutPage} />
            <Redirect exact from="*" to={Routes.Home} />
          </Switch>
          <Footer />
        </Router>
      </userContext.Provider>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
