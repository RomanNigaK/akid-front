import { createAction } from "@reduxjs/toolkit";
import { actSlice } from "./slice";
import { Set } from "../set/slice";

export const fetchActsBySetRequestAction = createAction<Pick<Set, "id">>(
  "act/fetchActsBySetRequestAction"
);

export const fetchActsRequestAction = createAction(
  "act/fetchActsRequestAction"
);

export const {
  fetchActsRequestSuccess,
  fetchActsBySetRequestSuccess,
} = actSlice.actions;
