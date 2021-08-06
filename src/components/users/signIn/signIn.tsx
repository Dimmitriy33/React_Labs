import "./signIn.scss";
import { useState } from "react";
import getToken from "@/api/apiAuth";
import getUser from "@/api/apiGetUser";
import UserContext, { IUser } from "../userContext";

function SignIn(props: { switchButtons: () => void }): JSX.Element {
  const [password, setPassword] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  return (
    <UserContext.Consumer>
      {(userCtx) => {
        const onLogin = async () => {
          const token = await getToken(email, password);
          userCtx && userCtx.login(token);

          const user = await getUser(token);
          userCtx && userCtx.setUser(user as IUser);

          props.switchButtons();
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
