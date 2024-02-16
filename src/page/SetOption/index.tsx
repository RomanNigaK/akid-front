import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import IconButton from "components/commons/IconButton";
import iconAdd from "@static/icon/add.svg";
import { getConstructionWhitoutSet } from "redux/slices/construction/selectors";

import ActList from "./ActList";
import {
  getActs,
  getActsBySet,
  getActsWhitoutSet,
} from "redux/slices/act/selectors";
import RegulatoryList from "./RegulatoryList";
import ConstructionList from "./ConstructionList";
import { getRequlations, getRequlationsBySet } from "redux/slices/requlatory/selectors";
import { useState } from "react";
import Modal from "components/modal/Modal";

import { ConstructionWithoutStatus } from "redux/slices/construction/slice";
import { fetchAddConstructionsRequest } from "redux/slices/construction/actions";
import { FastSearch } from "components/commons/fastSearch";
import SelectionConstruction from "components/form/SelectionConstruction";
import SelectionAct from "components/form/SelectionAct";
import { Act } from "redux/slices/act/slice";
import SelectionRequlatory from "components/form/SelectionRequlatory";
import { Requlatory } from "redux/slices/requlatory/slice";

export default function SetOption() {
  const [isVisbleModal, setIsVisibleModal] = useState(false);
  const dispatch = useAppDispatch();
  const constructions = useAppSelector(getConstructionWhitoutSet);
  const acts = useAppSelector(getActsWhitoutSet);
  const requlations = useAppSelector(getRequlations);

  const [elementModal, setElementModal] = useState<JSX.Element>();

  const handleAddConstructions = (
    _constructions: ConstructionWithoutStatus[] | string
  ) => {
    if (typeof _constructions === "string") {
      dispatch(
        fetchAddConstructionsRequest(
          constructions.filter((i) => i.id === _constructions)
        )
      );
    } else {
      dispatch(fetchAddConstructionsRequest(_constructions));
    }
  };

  const handleAddActs = (_act: Act[]) => {
    // dispatch(fetchAddConstructionsRequest(_act));
  };

  const handleAddRequlations = (_act: Requlatory[]) => {
    // dispatch(fetchAddConstructionsRequest(_act));
  };

  const handleOpenConstructionList = () => {
    setIsVisibleModal(true);
    setElementModal(
      <SelectionConstruction
        onClose={() => setIsVisibleModal(false)}
        constructions={constructions}
        multiSelect
        add={handleAddConstructions}
      />
    );
  };

  const handleOpenActList = () => {
    setIsVisibleModal(true);
    setElementModal(
      <SelectionAct
        onClose={() => setIsVisibleModal(false)}
        acts={acts}
        add={handleAddActs}
      />
    );
  };

  const handleOpenReqularyList = () => {
    setIsVisibleModal(true);
    setElementModal(
      <SelectionRequlatory
        onClose={() => setIsVisibleModal(false)}
        requlations={requlations}
        add={handleAddRequlations}
      />
    );
  };
  return (
    <>
      {isVisbleModal && elementModal && (
        <Modal onClose={() => setIsVisibleModal(false)}>{elementModal}</Modal>
      )}
      <div className="options">
        <FastSearch
          titleSearch="Поиск по конструкциям"
          items={constructions}
          choise={handleAddConstructions}
        />
        <div className="options__parts">
          <div className="options__list">
            <ConstructionList />
            <IconButton onClick={handleOpenConstructionList}>
              <img src={iconAdd} alt="" />
              Выбрать из списка
            </IconButton>
          </div>
          <div className="options__list">
            <ActList />
            <IconButton onClick={handleOpenActList}>
              <img src={iconAdd} alt="" />
              Добавить акт
            </IconButton>
          </div>
          <div className="options__list">
            <RegulatoryList />
            <IconButton onClick={handleOpenReqularyList}>
              <img src={iconAdd} alt="" />
              Добавить нормативный документ
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}
