import { createAction } from "@reduxjs/toolkit";
import { setSlice } from "./slice";
export type FetchCreateSet = {
  id: string;
  name: string;
  projectDoc?: string;
  amount?: number;
  objectConstruction?: string;
};

export type FetchSets={
  companyId: string;
}

export const fetchCreateSetRequestAction = createAction<FetchCreateSet>(
  "set/fetchCreateSetRequestAction"
);

export const fetchSetsRequestAction = createAction<FetchSets>("set/fetchSetsRequestAction")


export const {
  fetchCreateSetRequestError,
  fetchCreateSetRequestSuccess,
  setFetchStatusCreateSet,
  setSelectedSetId,
  setfetchSetsStatus,
  fetchSetsRequestSuccess,
  fetchUpdateSetRequest,
  fetchUpdateSetRequestSuccess
} = setSlice.actions;
