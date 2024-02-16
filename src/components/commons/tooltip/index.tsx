/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import sass from "./style.module.sass";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";

interface TooltipProps extends PropsWithChildren {
  title: string;
}
export default function Tooltip({ children, title }: TooltipProps) {
  const [style, setStyle] = useState<CSSProperties>({});
  const id = nanoid();

  useEffect(() => {
    const elem = document.querySelector(`[id='${id}']`) as HTMLDivElement;

    const updateStyle: CSSProperties = {
      left: elem?.offsetLeft + elem?.getBoundingClientRect().width + 5,
      marginTop: "-45px",
    };

    setStyle(updateStyle);
  }, []);

  let timerId = setInterval(() => {}, 0);

  const handleMouseEnter = () => {
    timerId = setTimeout(() => setStyle({ ...style, display: "block" }), 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerId);
    setStyle({ ...style, display: "none" });
  };

  

  const updateChildren = React.cloneElement(children as React.ReactElement, {
    id,
  });

  return (
    <span
      className="tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={()=>clearTimeout(timerId)}
    >
      {updateChildren}
      <div className={sass["tooltip__popup"]} style={style}>
        {title}
      </div>
    </span>
  );
}
