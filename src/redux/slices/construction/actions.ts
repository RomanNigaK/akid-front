import { createAction } from "@reduxjs/toolkit";
import { ConstructionId, constructionSlice } from "./slice";
import { Set } from "../set/slice";

export const fetchConstructionsBySetRequestAction = createAction(
  "construction/fetchConstructionsBySetRequestAction"
);

export const fetchConstructionsRequestAction = createAction(
  "construction/fetchConstructionRequestAction"
);

export const {
  fetchConstructionsRequestSuccess,
  fetchAddConstructionsRequest,
  fetchAddConstructionsRequestSuccess,
  fetchDeleteConstructionFromSetRequest,
  fetchDeleteConstructionFromSetRequestSuccess,
} = constructionSlice.actions;
