import "./signIn.scss";
import { useState } from "react";
import getToken from "@/api/apiAuth";
import getUser from "@/api/apiGetUser";
import validator from "validator";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import * as Routes from "../../../constants/routes";
import UserContext, { IUser } from "../userContext";

interface SignInProps {
  closeCallback: () => void;
}

function SignIn(props: SignInProps): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const history = useHistory();

  const closeModal = () => {
    Swal.fire({
      title: "Error",
      text: "Invalid login attempt!",
      icon: "error",
    });

    props.closeCallback();

    history.push(Routes.Home);
  };

  return (
    <UserContext.Consumer>
      {(userCtx) => {
        const onLogin = async () => {
          const token = await getToken(email, password);

          if (token === null) {
            closeModal();
          } else {
            userCtx && userCtx.login(token);
            const user = await getUser(token);

            if (user === null) {
              closeModal();
            }

            userCtx && userCtx.setUser(user as IUser);
          }

          document.body.removeChild<Element>(document.getElementsByClassName("modal-container")[0]);
        };

        return (
          <div className="signIn-container">
            <form onSubmit={onLogin} className="signIn-container__form">
              <h1>Sign In</h1>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                Email :
                <br />
                <input
                  type="text"
                  id="u_email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                {validator.isEmail(email) ? null : <span className="input-error">Invalid email</span>}
              </label>
              <br />

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                Password :
                <br />
                <input
                  id="u_password"
                  type="text"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
                {password.length > 5 && password.length < 30 && validator.isAlphanumeric(password) ? null : (
                  <span className="input-error">Invalid password</span>
                )}
              </label>
              <br />
              <button type="button" className="signIn-container__form__button" onClick={onLogin}>
                Login
              </button>
            </form>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}

export default SignIn;
