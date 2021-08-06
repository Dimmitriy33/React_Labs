import "./signUp.scss";
import Modal from "@/elements/modal";
import { useState } from "react";
import * as Routes from "../../../constants/routes";
import UserContext, { IRegisterUser, IUser } from "../userContext";

function SignIn(props: { closeCallback: () => void }): JSX.Element {
  const user = { id: "", userName: "", phoneNumber: "", addressDelivery: "", concurancyStamp: "" } as IUser;
  const token = "";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <UserContext.Consumer>
      {(userCtx) => {
        const onRegister = () => {
          userCtx && userCtx.login(token);
          userCtx && userCtx.setUser(user);
          window.location.assign(Routes.Profile);
        };
        return (
          <Modal closeCallback={props.closeCallback}>
            <div className="signUp-container">
              <form className="signUp-container__form">
                <h1>Sign Up</h1>
                <label htmlFor="email">
                  Email :
                  <br />
                  <input
                    type="text"
                    name="email"
                    onChange={(event) => {
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

                <label htmlFor="username">
                  Username :
                  <br />
                  <input
                    type="text"
                    name="username"
                    onChange={(event) => {
                      setUsername(event.currentTarget.value);
                    }}
                  />
                </label>
                <br />

                <label htmlFor="pNumber">
                  Phone number :
                  <br />
                  <input
                    type="text"
                    name="pNumber"
                    onChange={(event) => {
                      setPhoneNumber(event.currentTarget.value);
                    }}
                  />
                </label>
                <br />

                <label htmlFor="address">
                  Address :
                  <br />
                  <input
                    type="text"
                    name="address"
                    onChange={(event) => {
                      setAddress(event.currentTarget.value);
                    }}
                  />
                </label>
                <br />
                <input
                  className="signUp-container__form__button"
                  type="submit"
                  name="login"
                  value="Register"
                  onClick={onRegister}
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
