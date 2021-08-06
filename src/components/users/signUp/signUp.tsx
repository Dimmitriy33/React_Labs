import "./signUp.scss";
import { useState } from "react";
import getUser from "@/api/apiGetUser";
import getToken from "@/api/apiAuth";
import registerUser from "@/api/apiRegister";
import * as Routes from "../../../constants/routes";
import UserContext, { IRegisterUser, IUser } from "../userContext";

function SignUp(props: { switchButtons: () => void }): JSX.Element {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");

  const [userEmail, setEmail] = useState<string>("");
  const [userPassword, setPassword] = useState<string>("");
  const [userUsername, setUsername] = useState<string>("");
  const [userAddress, setAddress] = useState<string>("");
  const [userPhoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <UserContext.Consumer>
      {(userCtx) => {
        const onRegister = async () => {
          const userForRegister = {
            email: userEmail,
            password: userPassword,
            userName: userUsername,
            addressDelivery: userAddress,
            phoneNumber: userPhoneNumber,
          } as IRegisterUser;

          registerUser(userForRegister);

          setToken(await getToken(userForRegister.email, userForRegister.password));
          userCtx && userCtx.login(token);

          setUser(await getUser(token));
          userCtx && userCtx.setUser(user as IUser);

          props.switchButtons();
          window.location.assign(Routes.Profile);
        };
        return (
          <div className="signUp-container">
            <form className="signUp-container__form">
              <h1>Sign Up</h1>
              <label htmlFor="email">
                Email :
                <br />
                <input
                  type="text"
                  name="email"
                  value={userEmail}
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
                  value={userPassword}
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
        );
      }}
    </UserContext.Consumer>
  );
}

export default SignUp;
