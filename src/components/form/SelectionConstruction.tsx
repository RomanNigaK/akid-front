import { PayloadAction, nanoid } from "@reduxjs/toolkit";
import cn from "classnames";
import Button from "components/commons/button";
import { useReducer } from "react";
import {
  ConstructionWithoutStatus,
} from "redux/slices/construction/slice";

type SelectionConstructionProps = {
  onClose: () => void;
  add: (constructions: ConstructionWithoutStatus[]) => void;
  multiSelect?: boolean;
  constructions: ConstructionWithoutStatus[];
};

const reduser = (
  state: { id: string; name: string; cheked: boolean }[],
  action: PayloadAction<ConstructionWithoutStatus>
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

export default function SelectionConstruction({
  multiSelect = false,
  constructions,
  add,
  onClose,
}: SelectionConstructionProps) {
  const [state, disp] = useReducer(
    reduser,
    constructions.map((e) => {
      return { ...e, cheked: false };
    })
  );

  const handleAddSelected = () => {
    add(
      state
        .filter((i) => i.cheked)
        .map((e) => {
          return { id: e.id, name: e.name };
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
                {"designation" in e ? (
                  <>
                    <b>{e.designation as string}</b>
                    <span>{e.name}</span>
                  </>
                ) : (
                  <b>{e.name}</b>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        title="Добавить выбранные конструкции"
        action={handleAddSelected}
      />
    </form>
  );
}
