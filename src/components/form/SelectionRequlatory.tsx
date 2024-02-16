import { PayloadAction } from "@reduxjs/toolkit";
import cn from "classnames";
import Button from "components/commons/button";
import { useReducer } from "react";
import { Requlatory } from "redux/slices/requlatory/slice";

type SelectionRequlationsProps = {
  onClose: () => void;
  add: (requlations: Requlatory[]) => void;
  multiSelect?: boolean;
  requlations: Requlatory[];
};

const reduser = (
  state: {
    id: string;
    name: string;
    designation: string;
    cheked: boolean;
  }[],
  action: PayloadAction<Requlatory>
) => {
  switch (action.type) {
    case "multi": {
      return (state = state.map((e) => {
        if (e.id === action.payload.id) {
          if (e.cheked) return { ...e, cheked: false };
          return { ...e, cheked: true };
        }
        return { ...e };
      }));
    }
    case "one": {
      return (state = state.map((e) => {
        if (e.id === action.payload.id) {
          return { ...e, cheked: true };
        }
        return { ...e, cheked: false };
      }));
    }
    default:
      return state;
  }
};

export default function SelectionRequlatory({
  multiSelect = false,
  requlations,
  add,
  onClose,
}: SelectionRequlationsProps) {
  const [state, disp] = useReducer(
    reduser,
    requlations.map((e) => {
      return { ...e, cheked: false };
    })
  );

  const handleAddSelected = () => {
    add(
      state
        .filter((i) => i.cheked)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            designation: e.designation,
          };
        })
    );
    onClose();
  };

  return (
    <form>
      <h3>Список конструкций</h3>
      <div className="selection">
        {state.map((e) => {
          return (
            <div
              key={e.id}
              className="selection__item"
              onClick={() =>
                disp({ type: multiSelect ? "multi" : "one", payload: e })
              }
            >
              <div
                className={cn("selection__marker", {
                  circle: !multiSelect,
                  checked: e.cheked,
                })}
              />

              <div className="selection__data">
                {"designation" in e && (
                  <>
                    <b>{e.designation as string}</b>
                    <span>{e.name}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        title="Добавить"
        action={handleAddSelected}
      />
    </form>
  );
}
