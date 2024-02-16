import { takeEvery, call, put, delay } from "redux-saga/effects";
import {
  FetchRegData,
  fetchRegRequestAction,
  fetchRegRequestSeccess,
  setStatus,
} from "redux/slices/profile/actions";
import { Saga } from "./types";
import { Profile } from "redux/slices/profile/slice";

const fetchRegRequestActionHandler: Saga<FetchRegData> = function* ({
  payload,
}) {
  const body = payload;

  try {
    yield put(setStatus());
    yield put(fetchRegRequestSeccess(body as unknown as Profile))
  } catch (error) {
    console.log("error reg user");
    
  }
};

export default function* root() {
  yield takeEvery(fetchRegRequestAction, fetchRegRequestActionHandler);
}
