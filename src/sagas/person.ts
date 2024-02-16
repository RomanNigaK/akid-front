import { takeEvery, call, put, delay } from "redux-saga/effects";
import { Saga } from "./types";
import {
  fetchAddOtherPersonRequest,
  fetchAddOtherPersonRequestSuccess,
  fetchAddPersonRequest,
  fetchAddPersonRequestSuccess,
  fetchAddRepresentativeRequest,
  fetchAddRepresentativeRequestSuccess,
  fetchDeleteOtherPersonRequest,
  fetchDeleteOtherPersonRequestSuccess,
  fetchDeletePersonRequest,
  fetchDeletePersonRequestSuccess,
  fetchDeleteRepresentativeRequest,
  fetchDeleteRepresentativeRequestSuccess,
  fetchPersonRequestAction,
  fetchPersonRequestSuccess,
  fetchUpdateOtherPersonRequest,
  fetchUpdateOtherPersonRequestSuccess,
  fetchUpdatePersonRequest,
  fetchUpdatePersonRequestSuccess,
  setFetchStatusPersons,
} from "redux/slices/person/actions";
import { SetId } from "redux/slices/set/slice";
import { FetchStatus } from "redux/types";
import {
  OtherPerson,
  Person,
  TPerson,
  TypeRepresentative,
} from "redux/slices/person/slice";

const fetchPersonRequestActionHandler: Saga<{ setId: SetId }> = function* ({
  payload,
}) {
  const { setId } = payload;

  try {
    yield put(setFetchStatusPersons(FetchStatus.Fetching));

    // делаем запрос на сервер для полученяи всех данных
    yield delay(1000);
    yield put(
      fetchPersonRequestSuccess({
        developer: null,
        personcCrryingConstruction: null,
        personPreparingProjectDocumentation: null,
        operatingOrganization: null,
        personPerformedSubjectInspection: null,
        otherPersonsParticipatingExamination: null,
      })
    );
    yield put(setFetchStatusPersons(FetchStatus.Fetched));
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchAddPersonRequestHandler: Saga<{
  person: Pick<Person, "id" | "data">;
  type: TPerson;
}> = function* ({ payload }) {
  const { type, person } = payload;

  try {
    // делаем запрос на сервер для обновления данных
    yield delay(1000);
    yield put(fetchAddPersonRequestSuccess({ type }));
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchUpdatePersonRequestHandler: Saga<{
  person: Pick<Person, "id" | "data">;
  type: TPerson;
}> = function* ({ payload }) {
  const { type, person } = payload;

  try {
    // делаем запрос на сервер для обновления данных
    yield delay(1000);
    yield put(fetchUpdatePersonRequestSuccess({ type }));
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchDeletePersonRequestHandler: Saga<{
  type: TPerson;
}> = function* ({ payload }) {
  const { type } = payload;

  try {
    // делаем запрос на сервер для удаления данных
    yield delay(1000);
    yield put(fetchDeletePersonRequestSuccess({ type }));
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchAddRepresentativeRequestHandler: Saga<{
  type: TPerson;
  typeRepresentative: TypeRepresentative;
}> = function* ({ payload }) {
  const { type, typeRepresentative } = payload;

  try {
    // делаем запрос на сервер для удаления данных
    yield delay(1000);
    yield put(
      fetchAddRepresentativeRequestSuccess({ type, typeRepresentative })
    );
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchDeleteRepresentativeRequestHandler: Saga<{
  type: TPerson;
  typeRepresentative: TypeRepresentative;
}> = function* ({ payload }) {
  const { type, typeRepresentative } = payload;

  try {
    // делаем запрос на сервер для удаления данных
    yield delay(1000);
    yield put(
      fetchDeleteRepresentativeRequestSuccess({ type, typeRepresentative })
    );
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchAddOtherPersonRequestHandler: Saga<Pick<
  OtherPerson,
  "id" | "surnameInitials" | "data"
>> = function* ({ payload }) {
  try {
    // делаем запрос на сервер для удаления данных
    yield delay(1000);
    yield put(
      fetchAddOtherPersonRequestSuccess({ ...payload, createdId: payload.id })
    );
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchDeleteOtherPersonRequestHandler: Saga<Pick<
  OtherPerson,
  "id"
>> = function* ({ payload }) {
  try {
    // делаем запрос на сервер для удаления данных
    yield delay(1000);
    yield put(fetchDeleteOtherPersonRequestSuccess({ id: payload.id }));
  } catch (error) {
    console.log("error fetch person");
  }
};

const fetchUpdateOtherPersonRequestHandler: Saga<Pick<
  OtherPerson,
  "id"
>> = function* ({ payload }) {
  try {
    // делаем запрос на сервер для удаления данных
    yield delay(1000);
    yield put(fetchUpdateOtherPersonRequestSuccess({ id: payload.id }));
  } catch (error) {
    console.log("error fetch person");
  }
};

export default function* root() {
  yield takeEvery(fetchPersonRequestAction, fetchPersonRequestActionHandler);
  yield takeEvery(fetchAddPersonRequest, fetchAddPersonRequestHandler);
  yield takeEvery(fetchUpdatePersonRequest, fetchUpdatePersonRequestHandler);
  yield takeEvery(
    fetchAddRepresentativeRequest,
    fetchAddRepresentativeRequestHandler
  );
  yield takeEvery(
    fetchDeleteRepresentativeRequest,
    fetchDeleteRepresentativeRequestHandler
  );
  yield takeEvery(
    fetchAddOtherPersonRequest,
    fetchAddOtherPersonRequestHandler
  );
  yield takeEvery(
    fetchDeleteOtherPersonRequest,
    fetchDeleteOtherPersonRequestHandler
  );
  yield takeEvery(
    fetchUpdateOtherPersonRequest,
    fetchUpdateOtherPersonRequestHandler
  );
}
