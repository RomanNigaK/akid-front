import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const getRootSet = (state: RootState) => state.set;

export const getCreateSetStatus  = (state: RootState) => getRootSet(state).createSetFetchStatus;

export const getSelectedSet  = (state: RootState) => getRootSet(state).sets.find(i=>i.id===getSelectedSetId(state));

export const getSets  = (state: RootState) => getRootSet(state).sets;

export const getSelectedSetId  = (state: RootState) => getRootSet(state).selectedSetId;

export const getFetchSetsStatus  = (state: RootState) => getRootSet(state).fetchSetsStatus;

// export const getSetById  = (state: RootState, id?: string) => getRootSet(state).sets.filter(i=>i.id===id);

export const getSetById  =  createSelector([(state: RootState) =>getSets(state),(state: RootState,id?:string)=>id ],(sets,id)=>sets.find(i=>i.id===id)) 