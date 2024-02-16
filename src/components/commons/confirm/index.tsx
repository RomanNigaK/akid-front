import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Button from "../button";
import attention from "@static/icon/attention.svg"

export const Confirm = (close: () => void, title: string, del: () => void) => {
  const handleCancel = () => {
    close();
  };
  const handleDelete = () => {
    close();
    del();
  };
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="modalPopup">
          <div className="modalPopup__content">
            <span>
              <img src={attention} alt="" />
              Внимание!
            </span>
            <h4>{title}</h4>
            <div className="modalPopup__btnGroup">
              <Button title="Отменить" action={handleCancel} />
              <Button theme="blue" title="Удалить" action={handleDelete} />
            </div>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};
