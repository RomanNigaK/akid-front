import  { ReactElement } from "react";
import ReactDOM from "react-dom/client";

export const showModal = (
  callback: (close: () => void, title:string, del:()=>void) => ReactElement,
  titleConfirm:string,
  action:()=>void) => {
  const popUpRoot = ReactDOM.createRoot(
    document.getElementById("modal") as HTMLElement
  );
  const close = () => popUpRoot.unmount();
  const title = titleConfirm;
  const del = action
  popUpRoot.render(callback(close,title,del));
};
