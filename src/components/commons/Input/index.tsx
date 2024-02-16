import deleteIcon from "@static/icon/delete.svg";
import cn from "classnames";
import { useEffect, useState } from "react";

type Event<T> = (v: T) => void;

type InputProps = {
  name: string;
  onBlur?: Event<string | number>;
  onChange?: Event<string>;
  onFocus?: () => void;
  value?: (() => string | number) | string | null | number;
  placeholder?: string;
  error?: string;
  type?: "text" | "number";
};
export default function Input({
  name,
  placeholder,
  value,
  error,
  type = "text",
  onChange,
  onBlur,
  onFocus,
}: InputProps) {
  const [val, setVal] = useState(
    typeof value === "function" ? value() : value === null ? undefined : value
  );
  const [err, setErr] = useState(error);

  const handleChange = (e: string) => {
    onFocus && onFocus();
    setVal(e);
    onChange && onChange(e);
  };

  const handleBlur = () => {
    if (val) onBlur && onBlur(val);
  };

  useEffect(() => {
    setErr(error);
  }, [error]);

  return (
    <div className="input">
      <div className="input__data">
        {val && typeof val === "string" && val.length > 0 && (
          <small>{placeholder}</small>
        )}

        <input
          name={name}
          type={type}
          value={val}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className={cn({
            down: val && typeof val === "string" && val.length > 0,
          })}
          // autoComplete="off"
        />
        <img
          onClick={() => handleChange("")}
          src={deleteIcon}
          alt=""
          className={cn("input__option animation-rotate", {
            "input__option-hide": !val,
          })}
        />
      </div>
      {err && <div className="input__error">{err}</div>}
    </div>
  );
}
