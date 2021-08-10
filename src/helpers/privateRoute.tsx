import Modal from "@/elements/modal";
import { ReactNode, useContext, useState } from "react";
import { Route } from "react-router-dom";
import SignIn from "../components/users/signIn/signIn";
import Context from "../components/users/userContext";

export default function PrivateRoute({ children, ...rest }: { children: ReactNode; path: string }) {
  const context = useContext(Context);
  const [showSignInModal, toggleSignInModal] = useState<boolean>(false);

  if (context?.isAuthenticated) {
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
