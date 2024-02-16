import copyIcon from "@static/icon/copy.svg";
import deleteIcon from "@static/icon/delete.svg";
import cn from "classnames";
import { useState } from "react";

type Event = (v: string) => void;

type TextProps = {
  onBlur?: Event;
  onChange?: Event;
  value?: string;
  placeholder?: string;
  error?: string;
  name: string;
  onFocus?: () => void;
  description?: string;
};

export default function Text({
  error,
  placeholder,
  value = "",
  onBlur,
  onChange,
  name,
  onFocus,
  description,
}: TextProps) {
  const [val, setVal] = useState(value);
  const [err, setErr] = useState(error);

  const handleChange = (e: string) => {
    onFocus && onFocus();
    setVal(e);
    onChange && onChange(e);
  };

  const handleBlur = () => {
    onBlur && onBlur(val);
  };

  return (
    <>
      <div className="textarea">
        {val.length > 0 && (
          <div className="textarea__option">
            <div>
              <div>
                <img src={copyIcon} alt="" className="animation-rotate" />
                <img src={deleteIcon} alt="" className="animation-rotate" />
              </div>
            </div>
          </div>
        )}

        <div className="textarea__data">
          {val.length > 0 && <small>{placeholder}</small>}

          <textarea
            name={name}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            className={cn({ down: val.length > 0 })}
            defaultValue={value}
          />
        </div>

        {err && <div className="textarea__error">{err}</div>}
      </div>
      {description && (
        <div className="textarea__description">{description}</div>
      )}
    </>
  );
}
