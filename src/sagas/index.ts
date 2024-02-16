import { all, call } from "redux-saga/effects";
import profile from "./profile";
import set from "./set";
import person from "./person";
import construction from "./construction";
import act from "./act";
import requlary from "./requlary"

export default function* root() {
  yield all([
    call(profile),
    call(set),
    call(person),
    call(construction),
    call(act),
    call(requlary),
  ]);
}
