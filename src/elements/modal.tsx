import UserContext from "@/components/users/userContext";
import { ReactNode, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import rmImage from "../assets/images/icons/icon-remove-1.jpg";
import * as Routes from "../constants/routes";
import "./modal.scss";

interface IModalProps {
  children: ReactNode;
  closeCallback: () => void;
}

const Modal = (props: IModalProps): React.ReactPortal => {
  const root = document.createElement("div");
  root.classList.add("modal-container");
  const context = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    document.body.appendChild(root);
  }, []);

  const removeModal = () => {
    document.body.removeChild(root);
    props.closeCallback();

    if (!context?.isAiuthenticated) {
      history.push(Routes.Home);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-container__window">
      <div className="modal-container__window__button-container">
        <button
          type="button"
          className="modal-container__window__button-container__close"
          onClick={() => {
            removeModal();
          }}
          aria-label="Close modal"
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={rmImage} aria-hidden="true" />
        </button>
      </div>
      {props.children}
    </div>,
    root
  );
};

export default Modal;
