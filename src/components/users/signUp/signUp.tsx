import "./signUp.scss";
import { useState } from "react";
import validator from "validator";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync, setUserAsync } from "@/redux/actions/userActions";
import { MinAuthFieldLength, MaxAuthFieldLength, MaxFieldLength, MinFieldLength } from "@/constants/inputValidation";
import * as Routes from "../../../constants/routes";
import { IRegisterUser, IUser } from "../userContext";

interface SignUpProps {
  closeCallback: () => void;
}
function SignUp(props: SignUpProps): JSX.Element {
  const [userEmail, setEmail] = useState<string>("");
  const [userPassword, setPassword] = useState<string>("");
  const [userUsername, setUsername] = useState<string>("");
  const [userAddress, setAddress] = useState<string>("");
  const [userPhoneNumber, setPhoneNumber] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();

  const closeModal = () => {
    Swal.fire({
      title: "Error",
      text: "Invali1d login attempt!",
      icon: "error",
    });
    props.closeCallback();

    history.push(Routes.Home);
  };

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

      if (token === null) {
        closeModal();
      } else {
        dispatch(loginAsync(token));

        const user = await getUser(token);
        dispatch(setUserAsync(user as IUser));

        history.push(Routes.Profile);
      }
    } else {
      closeModal();
    }

    document.body.removeChild<Element>(document.getElementsByClassName("modal-container")[0]);
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
          {!validator.isEmail(userEmail) && <span className="input-error">Invalid email</span>}
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
          {userPassword.length >= MinAuthFieldLength &&
          userPassword.length < MaxAuthFieldLength &&
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
          {userUsername.length >= MinAuthFieldLength &&
          userUsername.length < MaxAuthFieldLength &&
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
          {!validator.isMobilePhone(userPhoneNumber) && <span className="input-error">Invalid phone number</span>}
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
          {userAddress.length >= MinFieldLength && userAddress.length < MaxFieldLength && validator.isAscii ? null : (
            <span className="input-error">Invalid address</span>
          )}
        </label>
        <br />
        <button type="button" className="signUp-container__form__button" onClick={onRegister}>
          Login
        </button>
      </form>
    </div>
  );
}

export default SignUp;
