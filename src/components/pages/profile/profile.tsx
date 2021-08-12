import changePassword from "@/api/apiChangePassword";
import updateUser from "@/api/apiUpdateUserInfo";
import { IUser } from "@/components/users/userContext";
import { MaxAuthFieldLength, MaxFieldLength, MinAuthFieldLength, MinFieldLength } from "@/constants/inputValidation";
import { setUserAsync } from "@/redux/actions/userActions";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import * as Routes from "../../../constants/routes";
import "./profile.scss";

function Profile(): JSX.Element {
  const [userUsername, setUsername] = useState<string>(useTypedSelector((state) => state.userReducer.user.userName));
  const [userAddress, setAddress] = useState<string>(
    useTypedSelector((state) => state.userReducer.user.addressDelivery)
  );
  const [userPhoneNumber, setPhoneNumber] = useState<string>(
    useTypedSelector((state) => state.userReducer.user.phoneNumber)
  );

  const [toogleChangePassword, setToogleChangePassword] = useState<boolean>(false);
  const [userPassword, setPassword] = useState<string>("");
  const [userNewPassword, setNewPassword] = useState<string>("");
  const [userRepeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.userReducer.user);
  const token = useTypedSelector((state) => state.userReducer.token);

  useEffect(() => {
    setUsername(user.userName);
    setPhoneNumber(user.addressDelivery);
    setPhoneNumber(user.phoneNumber);
  }, []);

  const onSaveChanges = async () => {
    const result = await updateUser(token, {
      id: user.id,
      userName: userUsername,
      concurancyStamp: "string",
      phoneNumber: userPhoneNumber,
      addressDelivery: userAddress,
    } as IUser);

    if (result == null) {
      Swal.fire({
        title: "Error",
        text: "Invalid update info attempt!",
        icon: "error",
      });
    } else {
      dispatch(setUserAsync(result as IUser));
      history.push(Routes.Home);
    }
  };

  const onChangePassword = async () => {
    if (!(userNewPassword === userRepeatNewPassword)) {
      Swal.fire({
        title: "Error",
        text: "Passwords are not equal!",
        icon: "error",
      });
    } else {
      const result = await changePassword(user.id, token, userPassword, userNewPassword);

      if (!result) {
        Swal.fire({
          title: "Error",
          text: "Invalid change password attempt!",
          icon: "error",
        });
      }
    }

    setToogleChangePassword(false);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Profile Info</h1>
        <label htmlFor="username">
          <div className="profile-container__info">
            <p>Username </p>
            <input
              type="text"
              name="username"
              value={userUsername}
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
            />
          </div>
          {userUsername.length >= MinAuthFieldLength &&
          userUsername.length < MaxAuthFieldLength &&
          validator.isAlphanumeric(userUsername) ? null : (
            <span className="input-error">Invalid username</span>
          )}
        </label>
        <br />
        <label htmlFor="pNumber">
          <div className="profile-container__info">
            <p>Phone number </p>
            <input
              type="text"
              name="pNumber"
              value={userPhoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.currentTarget.value);
              }}
            />
          </div>
          {validator.isMobilePhone(userPhoneNumber) ? null : <span className="input-error">Invalid phone number</span>}
        </label>
        <br />
        <label htmlFor="address">
          <div className="profile-container__info">
            <p>Address</p>
            <input
              type="text"
              name="address"
              value={userAddress}
              onChange={(event) => {
                setAddress(event.currentTarget.value);
              }}
            />
          </div>
          {userAddress.length >= MinFieldLength && userAddress.length < MaxFieldLength && validator.isAscii ? null : (
            <span className="input-error">Invalid address</span>
          )}
        </label>
        <br />

        {toogleChangePassword && (
          <label htmlFor="u_password">
            <div className="profile-container__info">
              <p>Current password</p>
              <input
                id="u_password"
                type="text"
                value={userPassword}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </div>
            {userPassword.length >= MinAuthFieldLength &&
            userPassword.length < MaxAuthFieldLength &&
            validator.isAlphanumeric(userPassword) ? null : (
              <span className="input-error">Invalid password</span>
            )}
          </label>
        )}

        {toogleChangePassword && (
          <label htmlFor="u_newPassword">
            <div className="profile-container__info">
              <p>New password</p>
              <input
                id="u_newPassword"
                type="text"
                value={userNewPassword}
                onChange={(event) => {
                  setNewPassword(event.currentTarget.value);
                }}
              />
            </div>
            {userNewPassword.length >= MinAuthFieldLength &&
            userNewPassword.length < MaxAuthFieldLength &&
            validator.isAlphanumeric(userNewPassword) ? null : (
              <span className="input-error">Invalid password</span>
            )}
          </label>
        )}

        {toogleChangePassword && (
          <label htmlFor="u_repeatNewPassword">
            <div className="profile-container__info">
              <p>Confirm new password</p>
              <input
                id="u_repeatNewPassword"
                type="text"
                value={userRepeatNewPassword}
                onChange={(event) => {
                  setRepeatNewPassword(event.currentTarget.value);
                }}
              />
            </div>
            {userRepeatNewPassword.length >= MinAuthFieldLength &&
            userRepeatNewPassword.length < MaxAuthFieldLength &&
            validator.isAlphanumeric(userRepeatNewPassword) ? null : (
              <span className="input-error">Invalid password</span>
            )}
          </label>
        )}

        {toogleChangePassword && (
          <div className="profile-container__btns">
            <button type="button" onClick={onChangePassword}>
              Change
            </button>
          </div>
        )}
        <div className="profile-container__btns">
          <button type="button" onClick={() => setToogleChangePassword(true)}>
            Change password
          </button>
          <button type="button" onClick={onSaveChanges}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
