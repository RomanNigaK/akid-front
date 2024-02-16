import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const getRootConstruction = (state: RootState) => state.construction;

export const getConstructionsBySet = (state: RootState) => getRootConstruction(state).constructionsBySet;

export const getConstructions = (state: RootState) => getRootConstruction(state).constructions;

export const getConstructionWhitoutSet = createSelector(
    [
      (state: RootState) => getConstructionsBySet(state).map(e=>e.id),
      (state: RootState) => getConstructions(state),
    ],
    (idsConstructionsBySet,construction) => construction.filter(e=>!idsConstructionsBySet.includes(e.id))
  );

  export const getConstructionsBySetIds = (state: RootState) => getRootConstruction(state).constructionsBySet.map(e=>e.id);  