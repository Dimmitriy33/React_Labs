import Modal from "@/elements/modal";
import useTypedSelector from "@/redux/customHooks/typedSelector";
import { ReactNode, useState } from "react";
import { Route } from "react-router-dom";
import SignIn from "../components/users/signIn/signIn";

export default function PrivateRoute({ children, ...rest }: { children: ReactNode; path: string }) {
  const [showSignInModal, toggleSignInModal] = useState<boolean>(false);

  const isAuth = useTypedSelector((state) => state.userReducer.isAuthenticated);

  if (isAuth) {
    return <Route {...rest} render={() => children} />;
  }
  return (
    <Route {...rest}>
      <Modal closeCallback={() => toggleSignInModal(false)}>
        <SignIn closeCallback={() => toggleSignInModal(false)} />
      </Modal>
    </Route>
  );
}
