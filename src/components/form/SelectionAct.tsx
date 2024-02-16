import { PayloadAction } from "@reduxjs/toolkit";
import cn from "classnames";
import Button from "components/commons/button";
import { useReducer } from "react";
import { Act } from "redux/slices/act/slice";

type SelectionActProps = {
  onClose: () => void;
  add: (acts: Act[]) => void;
  multiSelect?: boolean;
  acts: Act[];
};

const reduser = (
  state: {
    id: string;
    name: string;
    designation: string;
    template: string;
    cheked: boolean;
  }[],
  action: PayloadAction<Act>
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

export default function SelectionAct({
  multiSelect = false,
  acts,
  add,
  onClose,
}: SelectionActProps) {
  const [state, disp] = useReducer(
    reduser,
    acts.map((e) => {
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
            template: e.template,
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
