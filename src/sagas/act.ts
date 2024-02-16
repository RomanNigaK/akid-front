import { takeEvery, put, select } from "redux-saga/effects";

import {
  fetchActsBySetRequestSuccess,
  fetchActsRequestAction,
  fetchActsRequestSuccess,
} from "redux/slices/act/actions";
import { acts } from "mocks/act";
import { fetchConstructionsBySetRequestAction } from "redux/slices/construction/actions";
import { getConstructionsBySetIds } from "redux/slices/construction/selectors";
import { constructionAct } from "mocks/constructionAct";
import { Act } from "redux/slices/act/slice";
import { getActs } from "redux/slices/act/selectors";

const fetchActsRequestActionHandler = function* () {
  try {
    yield put(fetchActsRequestSuccess(acts));
  } catch (error) {
    console.log("error reg user");
  }
};

const fetchConstructionsBySetRequestActionHandler = function* () {
  try {
    const constructions: string[] = yield select(getConstructionsBySetIds);
    const acts: Act[] = yield select(getActs);

    const bundleActIds = [
      ...new Set(
        constructionAct
          .filter((i) => constructions.includes(i.constructionId))
          .map((e) => e.actId)
      ),
    ];

    const resultActs = acts.filter((i) => bundleActIds.includes(i.id));

    yield put(fetchActsBySetRequestSuccess(resultActs));
  } catch (error) {
    console.log("error reg user");
  }
};

export default function* root() {
  yield takeEvery(fetchActsRequestAction, fetchActsRequestActionHandler);

  yield takeEvery(
    fetchConstructionsBySetRequestAction,
    fetchConstructionsBySetRequestActionHandler
  );
}
