import { takeEvery, put, delay, select } from "redux-saga/effects";
import { Saga } from "./types";

import {
  FetchCreateSet,
  FetchSets,
  fetchCreateSetRequestAction,
  fetchCreateSetRequestSuccess,
  fetchSetsRequestAction,
  fetchSetsRequestSuccess,
  setFetchStatusCreateSet,
  setfetchSetsStatus,
} from "redux/slices/set/actions";
import { getAuthor } from "redux/slices/profile/selectors";
import { FetchStatus } from "redux/types";
import { StatusSet } from "constans/emuns";
import { nanoid } from "@reduxjs/toolkit";

const fetchCreateSetRequestActionHandler: Saga<FetchCreateSet> = function* ({
  payload,
}) {
  const body = payload;

  try {
    const author = yield select(getAuthor);

    yield put(setFetchStatusCreateSet({ status: FetchStatus.Fetching }));

    yield delay(2000);
    yield put(
      fetchCreateSetRequestSuccess({
        ...body,
        author,
        status: StatusSet.INWORK,
        fetchStatus: FetchStatus.NotFetched,
      })
    );
  } catch {
    console.log("error created set");
  }
};

const fetchSetsRequestActionHandler: Saga<FetchSets> = function* ({ payload }) {
  const body = payload;

  try {
    yield put(setfetchSetsStatus({ status: FetchStatus.Fetching }));

    yield delay(2000);

    yield put(
      fetchSetsRequestSuccess([
        {
          author: { name: "Роман", sername: "Кулиш" },
          id: "6a2K_ACdlQjIDdUgVuIt1_",
          name: "Фундамент",
          status: "INWORK",
          fetchStatus: FetchStatus.NotFetched,
        },
      ])
    );
  } catch {
    console.log("error created set");
  }
};

export default function* root() {
  yield takeEvery(
    fetchCreateSetRequestAction,
    fetchCreateSetRequestActionHandler
  );
  yield takeEvery(fetchSetsRequestAction, fetchSetsRequestActionHandler);
}
