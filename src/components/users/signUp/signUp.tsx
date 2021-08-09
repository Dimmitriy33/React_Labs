import "./signUp.scss";
import { useState } from "react";
import getUser from "@/api/apiGetUser";
import getToken from "@/api/apiAuth";
import registerUser from "@/api/apiRegister";
import validator from "validator";
import * as Routes from "../../../constants/routes";
import UserContext, { IRegisterUser, IUser } from "../userContext";

function SignUp(props: { switchButtons: () => void }): JSX.Element {
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

          const result = await registerUser(userForRegister);

          if (result) {
            const token = await getToken(userForRegister.email, userForRegister.password);
            userCtx && userCtx.login(token);

            const user = await getUser(token);
            userCtx && userCtx.setUser(user as IUser);

            document.body.removeChild<Element>(document.getElementsByClassName("modal-container")[0]);
            props.switchButtons();
            window.location.href = Routes.Profile;
          } else {
            window.alert("Fail sign up attempt");
          }
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
                {validator.isEmail(userEmail) ? null : <span className="input-error">Invalid email</span>}
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
                {userPassword.length > 5 &&
                userPassword.length < 30 &&
                validator.isAlphanumeric(userPassword) ? null : (
                  <span className="input-error">Invalid password</span>
                )}
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
                {userUsername.length > 5 &&
                userUsername.length < 30 &&
                validator.isAlphanumeric(userUsername) ? null : (
                  <span className="input-error">Invalid username</span>
                )}
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
                {validator.isMobilePhone(userPhoneNumber) ? null : (
                  <span className="input-error">Invalid phone number</span>
                )}
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
                {userAddress.length > 6 && userAddress.length < 100 && validator.isAlphanumeric(userAddress) ? null : (
                  <span className="input-error">Invalid address</span>
                )}
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
