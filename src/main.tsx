import "./styles/main.scss";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React from "react";
import { Provider } from "react-redux";
import { Header, Footer, HomePage, ProductsPage, BasketPage, AboutPage, ProfilePage } from "./components";
import * as Routes from "./constants/routes";
import PrivateRoute from "./helpers/privateRoute";
import { store } from "./redux/store";

class MainApp extends React.Component {
  componentDidCatch(error: Error) {
    alert(error);
    console.error("UI error:", error);
    window.location.assign(Routes.Home);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path={Routes.Home} component={HomePage} />
            <PrivateRoute path={Routes.Products}>
              <ProductsPage />
            </PrivateRoute>
            <PrivateRoute path={Routes.Basket}>
              <BasketPage />
            </PrivateRoute>
            <PrivateRoute path={Routes.About}>
              <AboutPage />
            </PrivateRoute>
            <PrivateRoute path={Routes.Profile}>
              <ProfilePage />
            </PrivateRoute>
            <Redirect exact from="*" to={Routes.Home} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
