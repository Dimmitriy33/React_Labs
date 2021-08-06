import "./styles/main.scss";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React from "react";
import { Header, Footer, HomePage, ProductsPage, BasketPage, AboutPage, ProfilePage } from "./components";
import * as Routes from "./constants/routes";
import UserContext, { IContext, IUser } from "./components/users/userContext";

class MainApp extends React.Component<any, { user: IUser; token: string }> {
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
  };

  logout = () => {
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
    };

    return (
      <UserContext.Provider value={userCtx}>
        <Router>
          <Header />
          <Switch>
            <Route path={Routes.Home} component={HomePage} />
            <Route path={Routes.Products} component={ProductsPage} />
            <Route path={Routes.Basket} component={BasketPage} />
            <Route path={Routes.About} component={AboutPage} />
            <Route path={Routes.Profile} component={ProfilePage} />
            <Redirect exact from="*" to={Routes.Home} />
          </Switch>
          <Footer />
        </Router>
      </UserContext.Provider>
    );
  }
}

ReactDom.render(<MainApp />, document.getElementById("app"));
