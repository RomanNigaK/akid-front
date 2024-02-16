import { configureStore } from "@reduxjs/toolkit";
import setSlice from "./slices/set/slice";
import profileSlice from "./slices/profile/slice"
import personSlice from "./slices/person/slice"
import constructionSlice from "./slices/construction/slice"
import actSlice from "./slices/act/slice"
import requlatorySlice from "./slices/requlatory/slice"
import createSagaMiddleware from "redux-saga";
import root from "./../sagas"

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    set: setSlice,
    profile: profileSlice,
    person: personSlice,
    construction: constructionSlice,
    act: actSlice,
    requlatory: requlatorySlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(root);
type RootState = ReturnType<typeof store.getState>;
export type { RootState };

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };
