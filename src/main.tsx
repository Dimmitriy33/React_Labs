import "./styles/main.scss";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React from "react";
import * as Routes from "./constants/routes";
import { Header, Footer, HomePage, ProductsPage, BasketPage, AboutPage, SignInPage, SignUpPage } from "./components";

class MainApp extends React.Component {
  componentDidCatch(error: Error) {
    alert(error);
    console.error("UI error:", error);
    window.location.assign(Routes.Home);
  }

  render() {
    return (
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
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
