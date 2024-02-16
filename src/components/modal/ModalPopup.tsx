import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "redux/store";

type IModal = PropsWithChildren;

export default function ModalPopup({ children }: IModal) {
  return (
    <Provider store={store}>
      <div className="modalPopup">
        <div className="modalPopup__content">{children}</div>
      </div>
    </Provider>
  );
}
