import { createAction } from "@reduxjs/toolkit";
import { profileSlice } from "./slice";

export type FetchRegData={
    id: string;
    name: string;
    sername: string;
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
}

export const fetchRegRequestAction = createAction<FetchRegData>(
    "profile/fetchRegRequestAction"
);

export const {fetchRegRequestSeccess, setStatus} =profileSlice.actions;
