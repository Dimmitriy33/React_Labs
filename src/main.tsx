import "./styles/main.scss";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React from "react";
import { Header, Footer, HomePage, ProductsPage, BasketPage, AboutPage, ProfilePage } from "./components";
import * as Routes from "./constants/routes";
import UserContext, { IContext, IUser } from "./components/users/userContext";
import PrivateRoute from "./helpers/privateRoute";

class MainApp extends React.Component<any, { user: IUser; token: string; isAiuthenticated: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {
        id: "",
        userName: "",
        phoneNumber: "",
        addressDelivery: "",
        concurancyStamp: "",
      },
      token: "",
      isAiuthenticated: false,
    };
  }

  componentDidCatch(error: Error) {
    alert(error);
    console.error("UI error:", error);
    window.location.assign(Routes.Home);
  }

  setUser = (newUser: IUser) => {
    this.setState({ user: newUser });
  };

  login = (newToken: string) => {
    this.setState({ token: newToken });
    this.setState({ isAiuthenticated: true });
  };

  logout = () => {
    this.setState({ isAiuthenticated: false });
    this.setState({ token: "" });
    this.setState({ user: { id: "", userName: "", phoneNumber: "", addressDelivery: "", concurancyStamp: "" } });
    window.location.assign(Routes.Home);
  };

  render() {
    const userCtx: IContext = {
      user: this.state.user,
      logout: this.logout,
      login: this.login,
      setUser: this.setUser,
      token: this.state.token,
      isAiuthenticated: this.state.isAiuthenticated,
    };

    return (
      <UserContext.Provider value={userCtx}>
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
      </UserContext.Provider>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
