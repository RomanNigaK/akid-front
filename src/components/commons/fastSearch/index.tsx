/* eslint-disable react/prop-types */
import { nanoid } from "@reduxjs/toolkit";
import iconFastSearch from "@static/icon/fast-search.svg";
import { useEffect, useState } from "react";
import closePopup from "@static/icon/delete.svg";

type SelectType = {
  name: string;
  id: string;
};

export type SelectProps<T extends { id: string; name: unknown }> = {
  items: T[];
  titleSearch: string;
  choise: (val: T["id"]) => void;
};

export const FastSearch: React.FC<SelectProps<SelectType>> = ({
  titleSearch,
  items,
  choise,
}) => {
  const [value, setValue] = useState("");

  const [serach, setSearch] = useState<SelectType[]>();

  const clearSearch = () => {
    setValue("");
  };

  const handleChoise = (id: string) => {
    setValue("");
    choise(id);
  };

  useEffect(() => {
    if (value.length > 3)
      setSearch(items.filter((i) => i.name.includes(value)));
  }, [items, value]);
  return (
    <div className="fast-search">
      {value.length > 0 && titleSearch && <small>{titleSearch}</small>}

      <input
        type="text"
        value={value}
        placeholder={titleSearch}
        onChange={(e) => setValue(e.target.value)}
      />
      <img src={iconFastSearch} alt="" className="fast-search__img" />

      {value && value.length > 3 && (
        <div className="popup">
          <img
            src={closePopup}
            alt="закрыть"
            className="animation-rotate"
            onClick={clearSearch}
          />
          <ul>
            {serach &&
              serach.length > 0 &&
              serach.map((e) => {
                return (
                  <li key={nanoid()} onClick={() => handleChoise(e.id)}>
                    <span />
                    {e.name}
                  </li>
                );
              })}
            {serach && serach.length === 0 && (
              <span className="popup__not-found">не найдено</span>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
