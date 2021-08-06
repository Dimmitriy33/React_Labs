import "./signIn.scss";
import Modal from "@/elements/modal";
import { useState } from "react";
import * as Routes from "../../../constants/routes";
import UserContext, { IUser } from "../userContext";

function SignIn(props: { closeCallback: () => void }): JSX.Element {
  const user = { id: "", userName: "", phoneNumber: "", addressDelivery: "", concurancyStamp: "" } as IUser;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  debugger;
  return (
    <UserContext.Consumer>
      {(userCtx) => {
        const onLogin = () => {
          userCtx && userCtx.login(token);
          userCtx && userCtx.setUser(user);
          window.location.assign(Routes.Home);
        };
        return (
          <Modal closeCallback={props.closeCallback}>
            <div className="signIn-container">
              <form className="signIn-container__form">
                <h1>Sign In</h1>
                <label htmlFor="email">
                  Email :
                  <br />
                  <input
                    type="text"
                    name="email"
                    onChange={(event) => {
                      console.log(event.target);
                      setEmail(event.currentTarget.value);
                    }}
                  />
                </label>
                <br />

                <label htmlFor="password">
                  Password :
                  <br />
                  <input
                    type="text"
                    name="password"
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                  />
                </label>
                <br />
                <input
                  className="signIn-container__form__button"
                  type="submit"
                  name="login"
                  value="Login"
                  onClick={onLogin}
                />
              </form>
            </div>
          </Modal>
        );
      }}
    </UserContext.Consumer>
  );
}

export default SignIn;
