/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypePerson } from "constans/emuns";
import { FetchStatus } from "redux/types";

export type TPerson = keyof typeof TypePerson;

export type TypeRepresentative = "representative" | "buildControl";

export type Representative = {
  id: string;
  surnameInitials: string;
  postInCompany?: string;
  nrc?: string;
  order?: string;
  file: {
    id: string;
    fileName: string;
    originalFileName: string;
  } | null;
  fetchStatus: FetchStatus;
};

export type Person = {
  id: string;
  data: string;
  fetchStatus: FetchStatus;
  representative: Representative | null;
  buildControl?: Representative | null;
};

export type OtherPerson = {
  id: string;
  surnameInitials: string;
  data: string;
  fetchStatus: FetchStatus;
};

type Persons = Record<TPerson, Person | OtherPerson[] | null>;

interface IState {
  fetchPersonsStatus: FetchStatus;
  persons: Persons | null;
}

const initialState: IState = {
  fetchPersonsStatus: FetchStatus.NotFetched,
  persons: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setFetchStatusPersons: (state, actions: PayloadAction<FetchStatus>) => {
      state.fetchPersonsStatus = actions.payload;
    },
    fetchPersonRequestSuccess: (state, actions: PayloadAction<Persons>) => {
      state.persons = actions.payload;
    },
    fetchAddPersonRequest: (
      state,
      actions: PayloadAction<{
        type: TPerson;
        person: Pick<Person, "id" | "data">;
      }>
    ) => {
      if (state.persons)
        state.persons[actions.payload.type] = {
          ...actions.payload.person,
          representative: null,
          fetchStatus: FetchStatus.Fetching,
        };
    },
    fetchAddPersonRequestSuccess: (
      state,
      actions: PayloadAction<{ type: TPerson }>
    ) => {
      const { type } = actions.payload;
      if (state.persons) {
        const data = state.persons[type];
        if (data)
          state.persons[type] = { ...data, fetchStatus: FetchStatus.Fetched };
      }
    },
    fetchUpdatePersonRequest: (
      state,
      actions: PayloadAction<{
        type: TPerson;
        person: Pick<Person, "id" | "data">;
      }>
    ) => {
      if (state.persons)
        state.persons[actions.payload.type] = {
          ...actions.payload.person,
          representative: null,
          fetchStatus: FetchStatus.Fetching,
        };
    },
    fetchUpdatePersonRequestSuccess: (
      state,
      actions: PayloadAction<{ type: TPerson }>
    ) => {
      const { type } = actions.payload;
      if (state.persons) {
        const data = state.persons[type];
        if (data)
          state.persons[type] = { ...data, fetchStatus: FetchStatus.Fetched };
      }
    },
    fetchDeletePersonRequest: (
      state,
      actions: PayloadAction<{ type: TPerson }>
    ) => {
      const { type } = actions.payload;
      if (state.persons) {
        const data = state.persons[type];
        if (data)
          state.persons[type] = { ...data, fetchStatus: FetchStatus.Fetching };
      }
    },
    fetchDeletePersonRequestSuccess: (
      state,
      actions: PayloadAction<{ type: TPerson }>
    ) => {
      const { type } = actions.payload;
      if (state.persons) {
        const data = state.persons[type];
        if (data) state.persons[type] = null;
      }
    },
    fetchUpdateStatusPerson: (
      state,
      actions: PayloadAction<{ type: TPerson; status: FetchStatus }>
    ) => {
      const { type, status } = actions.payload;
      if (state.persons) {
        const data = state.persons[type];
        if (data)
          state.persons[type] = {
            ...data,
            fetchStatus: FetchStatus.NotFetched,
          };
      }
    },
    fetchAddRepresentativeRequest: (
      state,
      actions: PayloadAction<{
        typeRepresentative: TypeRepresentative;
        type: TPerson;
        representative: Pick<
          Representative,
          "id" | "nrc" | "order" | "postInCompany" | "surnameInitials"
        >;
      }>
    ) => {
      const { representative, type, typeRepresentative } = actions.payload;

      if (state.persons) {
        const data = { ...state.persons[type] };
        if (data && "representative" in data) {
          state.persons[type] = {
            ...(data as Person),
            [typeRepresentative]: {
              ...representative,
              fetchStatus: FetchStatus.Fetching,
            },
          };
        }
      }
    },
    fetchAddRepresentativeRequestSuccess: (
      state,
      actions: PayloadAction<{
        typeRepresentative: TypeRepresentative;
        type: TPerson;
      }>
    ) => {
      const { type, typeRepresentative } = actions.payload;
      if (state.persons) {
        const person = { ...state.persons[type] };
        if (person && typeRepresentative in person) {
          const data = person as Person;
          state.persons[type] = {
            ...data,
            [typeRepresentative]: {
              ...(data[typeRepresentative] as Representative),
              fetchStatus: FetchStatus.Fetched,
            },
          };
        }
      }
    },
    updateStatusRepresentative: (
      state,
      actions: PayloadAction<{
        typeRepresentative: TypeRepresentative;
        type: TPerson;
        status: FetchStatus;
      }>
    ) => {
      const { type, typeRepresentative, status } = actions.payload;
      if (state.persons) {
        const person = { ...state.persons[type] };
        if (person && typeRepresentative in person) {
          const data = person as Person;
          state.persons[type] = {
            ...data,
            [typeRepresentative]: {
              ...(data[typeRepresentative] as Representative),
              fetchStatus: status,
            },
          };
        }
      }
    },
    fetchDeleteRepresentativeRequest: (
      state,
      actions: PayloadAction<{
        type: TPerson;
        typeRepresentative: TypeRepresentative;
      }>
    ) => {
      const { type, typeRepresentative } = actions.payload;
      if (state.persons) {
        const person = { ...state.persons[type] };
        if (person && typeRepresentative in person) {
          const data = person as Person;
          state.persons[type] = {
            ...data,
            [typeRepresentative]: {
              ...(data[typeRepresentative] as Representative),
              fetchStatus: FetchStatus.Fetching,
            },
          };
        }
      }
    },
    fetchDeleteRepresentativeRequestSuccess: (
      state,
      actions: PayloadAction<{
        type: TPerson;
        typeRepresentative: TypeRepresentative;
      }>
    ) => {
      const { type, typeRepresentative } = actions.payload;
      if (state.persons) {
        const person = { ...state.persons[type] };
        if (person && typeRepresentative in person) {
          const data = person as Person;
          state.persons[type] = {
            ...data,
            [typeRepresentative]: null,
          };
        }
      }
    },
    fetchAddOtherPersonRequest: (
      state,
      actions: PayloadAction<
        Pick<OtherPerson, "id" | "surnameInitials" | "data">
      >
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination === null) {
          state.persons.otherPersonsParticipatingExamination = [
            { ...actions.payload, fetchStatus: FetchStatus.Fetching },
          ];
        } else {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          array.push({ ...actions.payload, fetchStatus: FetchStatus.Fetching });

          state.persons.otherPersonsParticipatingExamination = array;
        }
    },
    fetchAddOtherPersonRequestSuccess: (
      state,
      actions: PayloadAction<
        Pick<OtherPerson, "id" | "surnameInitials" | "data"> & {
          createdId: string;
        }
      >
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination === null) {
          state.persons.otherPersonsParticipatingExamination = [
            { ...actions.payload, fetchStatus: FetchStatus.Fetching },
          ];
        } else {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          const index = array.findIndex(
            (i) => i.id === actions.payload.createdId
          );

          array[index] = { ...array[index], fetchStatus: FetchStatus.Fetched };

          state.persons.otherPersonsParticipatingExamination = array;
        }
    },
    fetchDeleteOtherPersonRequestSuccess: (
      state,
      actions: PayloadAction<Pick<OtherPerson, "id">>
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination !== null) {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          state.persons.otherPersonsParticipatingExamination = array.filter(
            (i) => i.id !== actions.payload.id
          );
        }
    },
    fetchDeleteOtherPersonRequest: (
      state,
      actions: PayloadAction<Pick<OtherPerson, "id">>
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination !== null) {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          const index = array.findIndex((i) => i.id === actions.payload.id);

          array[index] = { ...array[index], fetchStatus: FetchStatus.Fetching };

          state.persons.otherPersonsParticipatingExamination = array;
        }
    },
    updateOtherPersonStatus: (
      state,
      actions: PayloadAction<Pick<OtherPerson, "id">&{status:FetchStatus}>
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination !== null) {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          const index = array.findIndex((i) => i.id === actions.payload.id);

          array[index] = { ...array[index], fetchStatus: actions.payload.status };

          state.persons.otherPersonsParticipatingExamination = array;
        }
    },
    fetchUpdateOtherPersonRequest: (
      state,
      actions: PayloadAction<Pick<OtherPerson, "id" | "surnameInitials" | "data">>
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination !== null) {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          const index = array.findIndex((i) => i.id === actions.payload.id);

          array[index] = { ...actions.payload, fetchStatus: FetchStatus.Fetching };

          state.persons.otherPersonsParticipatingExamination = array;
        }
    },
    fetchUpdateOtherPersonRequestSuccess: (
      state,
      actions: PayloadAction<Pick<OtherPerson, "id">>
    ) => {
      if (state.persons)
        if (state.persons.otherPersonsParticipatingExamination !== null) {
          const array = state.persons
            .otherPersonsParticipatingExamination as OtherPerson[];

          const index = array.findIndex((i) => i.id === actions.payload.id);

          array[index] = { ...array[index], fetchStatus: FetchStatus.Fetched };

          state.persons.otherPersonsParticipatingExamination = array;
        }
    },
  },
});
export default personSlice.reducer;
