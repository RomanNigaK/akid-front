import { takeEvery, call, put, delay } from "redux-saga/effects";

import {
  fetchAddConstructionsRequest,
  fetchAddConstructionsRequestSuccess,
  fetchConstructionsBySetRequestAction,
  fetchConstructionsRequestAction,
  fetchConstructionsRequestSuccess,
  fetchDeleteConstructionFromSetRequest,
  fetchDeleteConstructionFromSetRequestSuccess,
} from "redux/slices/construction/actions";
import { construction } from "mocks/construction";
import { ConstructionId, ConstructionWithoutStatus } from "redux/slices/construction/slice";
import { Saga } from "./types";
import { fetchRequlationsBySetRequestAction } from "redux/slices/requlatory/actions";

const fetchConstructionsRequestActionHandler = function* () {
  try {
    yield put(fetchConstructionsRequestSuccess(construction));
  } catch (error) {
    console.log("error reg user");
  }
};

const fetchAddConstructionsRequestHandler:Saga<ConstructionWithoutStatus[]> = function* ({payload}) {
  try {
    
    yield put(fetchAddConstructionsRequestSuccess(payload));
    // перезапрашиваем связанные акты с этми списком конструкций
    // пока мок потом нужно будет отправить только массив ids
    yield put(fetchConstructionsBySetRequestAction())
    yield put(fetchRequlationsBySetRequestAction())
    
  } catch (error) {
    console.log("error reg user");
  }
};

const ffetchDeleteConstructionFromSetRequestActionHandler:Saga<ConstructionId> = function* ({payload}) {
  try {
    
    yield put(fetchDeleteConstructionFromSetRequestSuccess(payload));

    // перезапрашиваем связанные акты с этми списком конструкций
    // пока мок потом нужно будет отправить только массив ids
    yield put(fetchConstructionsBySetRequestAction())
    yield put(fetchRequlationsBySetRequestAction())

  } catch (error) {
    console.log("error reg user");
  }
};



export default function* root() {
  yield takeEvery(
    fetchConstructionsRequestAction,
    fetchConstructionsRequestActionHandler
  );

  yield takeEvery(
    fetchAddConstructionsRequest,
    fetchAddConstructionsRequestHandler
  );

  yield takeEvery(
    fetchDeleteConstructionFromSetRequest,
    ffetchDeleteConstructionFromSetRequestActionHandler
  );
}
