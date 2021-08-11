import changePassword from "@/api/apiChangePassword";
import updateUser from "@/api/apiUpdateUserInfo";
import { IUser } from "@/components/users/userContext";
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
  const [userUsername, setUsername] = useState<string>(useTypedSelector((state) => state.user.user.userName));
  const [userAddress, setAddress] = useState<string>(useTypedSelector((state) => state.user.user.addressDelivery));
  const [userPhoneNumber, setPhoneNumber] = useState<string>(useTypedSelector((state) => state.user.user.phoneNumber));

  const [toogleChangePassword, setToogleChangePassword] = useState<boolean>(false);
  const [userPassword, setPassword] = useState<string>("");
  const [userNewPassword, setNewPassword] = useState<string>("");
  const [userRepeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useTypedSelector((state) => state.user.user);
  const token = useTypedSelector((state) => state.user.token);

  useEffect(() => {
    const user1 = useTypedSelector((state) => state.user.user);
    setUsername(user1.userName);
    setPhoneNumber(user1.addressDelivery);
    setPhoneNumber(user1.phoneNumber);
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
          {userUsername.length > 5 && userUsername.length < 30 && validator.isAlphanumeric(userUsername) ? null : (
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
          {userAddress.length > 6 && userAddress.length < 100 && validator.isAscii ? null : (
            <span className="input-error">Invalid address</span>
          )}
        </label>
        <br />

        {toogleChangePassword ? (
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
            {userPassword.length > 5 && userPassword.length < 30 && validator.isAlphanumeric(userPassword) ? null : (
              <span className="input-error">Invalid password</span>
            )}
          </label>
        ) : null}

        {toogleChangePassword ? (
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
            {userNewPassword.length > 5 &&
            userNewPassword.length < 30 &&
            validator.isAlphanumeric(userNewPassword) ? null : (
              <span className="input-error">Invalid password</span>
            )}
          </label>
        ) : null}

        {toogleChangePassword ? (
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
            {userRepeatNewPassword.length > 5 &&
            userRepeatNewPassword.length < 30 &&
            validator.isAlphanumeric(userRepeatNewPassword) ? null : (
              <span className="input-error">Invalid password</span>
            )}
          </label>
        ) : null}

        {toogleChangePassword ? (
          <div className="profile-container__btns">
            <button type="button" onClick={onChangePassword}>
              Change
            </button>
          </div>
        ) : null}

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
