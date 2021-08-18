import "./styles/main.scss";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Header, Footer, HomePage, ProfilePage } from "./components";

import * as Routes from "./constants/routes";
import PrivateRoute from "./helpers/privateRoute";
import store from "./redux/store";
import Spinner from "./helpers/spinner/spinner";

const ProductsPage = lazy(() => import("./components/pages/products/products"));
const AboutPage = lazy(() => import("./components/pages/about"));
const BasketPage = lazy(() => import("./components/pages/basket/basket"));

const Profile = React.memo(ProfilePage);

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
          <Suspense fallback={<Spinner />}>
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
                <Profile />
              </PrivateRoute>
              <Redirect exact from="*" to={Routes.Home} />
            </Switch>
            <Footer />
          </Suspense>
        </Router>
      </Provider>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
