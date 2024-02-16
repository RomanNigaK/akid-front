import { nanoid } from "@reduxjs/toolkit";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement>;

export default function IconButton(props: Props) {
  const { children } = props;

  const id = nanoid();
  return (
    <>
      <label htmlFor={id}>
        <button {...props} className="icon-button">
          {children}
        </button>
        ;
      </label>
      <input
        type="file"
        onChange={(e) =>console.log()}
        id={id}
        style={{ display: "none" }}
      />
    </>
  );
}
