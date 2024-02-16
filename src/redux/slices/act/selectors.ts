import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const getRootAct = (state: RootState) => state.act;

export const getActsBySet = (state: RootState) => getRootAct(state).actsBySet;

export const getActs = (state: RootState) => getRootAct(state).acts;

export const getActsWhitoutSet = createSelector(
    [
      (state: RootState) => getActsBySet(state).map(e=>e.id),
      (state: RootState) => getActs(state),
    ],
    (idsActsBySet,acts) => acts.filter(e=>!idsActsBySet.includes(e.id))
  );