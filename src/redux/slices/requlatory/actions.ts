import { createAction } from "@reduxjs/toolkit";
import { requlatorySlice } from "./slice";

export const fetchRequlationsBySetRequestAction = createAction(
    "requlatory/fetchRequlationsBySetRequestAction"
);

export const fetchRequlationsRequestAction = createAction(
    "requlatory/fetchRequlationsRequestAction"
);

export const {fetchRequlationsRequestSuccess,fetchRequlationsBySetRequestSuccess} =requlatorySlice.actions;
