import { createAction } from "@reduxjs/toolkit";
import { personSlice } from "./slice";
import { SetId } from "../set/slice";

export type FetchPersons={
  setId:SetId
}

export const fetchPersonRequestAction = createAction<FetchPersons>(
  "person/fetchPersonRequestAction"
);

export const {
  fetchAddPersonRequest,
  fetchAddPersonRequestSuccess,
  setFetchStatusPersons,
  fetchPersonRequestSuccess,
  fetchUpdateStatusPerson,
  fetchUpdatePersonRequest,
  fetchUpdatePersonRequestSuccess,
  fetchDeletePersonRequest,
  fetchDeletePersonRequestSuccess,
  fetchAddRepresentativeRequest,
  fetchAddRepresentativeRequestSuccess,
  updateStatusRepresentative,
  fetchDeleteRepresentativeRequest,
  fetchDeleteRepresentativeRequestSuccess,
  fetchAddOtherPersonRequest,
  fetchAddOtherPersonRequestSuccess,
  fetchDeleteOtherPersonRequest,
  fetchDeleteOtherPersonRequestSuccess,
  updateOtherPersonStatus,
  fetchUpdateOtherPersonRequest,
  fetchUpdateOtherPersonRequestSuccess,
} = personSlice.actions;
