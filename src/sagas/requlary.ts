import { takeEvery, put, select } from "redux-saga/effects";

import { requlary } from "mocks/requlary";
import {
  fetchRequlationsBySetRequestAction,
  fetchRequlationsBySetRequestSuccess,
  fetchRequlationsRequestAction,
  fetchRequlationsRequestSuccess,
} from "redux/slices/requlatory/actions";
import { getConstructionsBySetIds } from "redux/slices/construction/selectors";
import { Requlatory } from "redux/slices/requlatory/slice";
import { getRequlations } from "redux/slices/requlatory/selectors";
import { constructionRequlary } from "mocks/constructionRequlary";

const fetchRequlationsRequestActionHandler = function* () {
  try {
    yield put(fetchRequlationsRequestSuccess(requlary));
  } catch (error) {
    console.log("error reg user");
  }
};

const fetchConstructionsBySetRequestActionHandler = function* () {
  try {
    const constructions: string[] = yield select(getConstructionsBySetIds);
    const requlations: Requlatory[] = yield select(getRequlations);

    const bundleRequlationsIds = [
      ...new Set(
        constructionRequlary
          .filter((i) => constructions.includes(i.constructionId))
          .map((e) => e.reqularyId)
      ),
    ];

    const resultRequlations = requlations.filter((i) =>
      bundleRequlationsIds.includes(i.id)
    );

    yield put(fetchRequlationsBySetRequestSuccess(resultRequlations));
  } catch (error) {
    console.log("error reg user");
  }
};

export default function* root() {
  yield takeEvery(
    fetchRequlationsRequestAction,
    fetchRequlationsRequestActionHandler
  );

  yield takeEvery(
    fetchRequlationsBySetRequestAction,
    fetchConstructionsBySetRequestActionHandler
  );
}
