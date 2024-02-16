import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";
import { Profile } from "../profile/slice";
import { StatusSet } from "constans/emuns";

export type SetId = string;

export type Set = {
  id: SetId;
  name: string;
  projectDoc?: string;
  amount?: number;
  objectConstruction?: string;
  status: keyof typeof StatusSet;
  author: Pick<Profile, "sername" | "name">;
  fetchStatus: FetchStatus;
};

interface IState {
  fetchSetsStatus: FetchStatus;
  sets: Set[];
  createSetFetchStatus: FetchStatus;
  selectedSet: Set | null;
  selectedSetId: SetId;
}

const initialState: IState = {
  createSetFetchStatus: FetchStatus.NotFetched,
  fetchSetsStatus: FetchStatus.NotFetched,
  sets: [],
  selectedSet: null,
  selectedSetId: "",
};

export const setSlice = createSlice({
  name: "set",
  initialState,
  reducers: {
    setFetchStatusCreateSet: (
      state,
      actions: PayloadAction<{ status: FetchStatus }>
    ) => {
      const { status } = actions.payload;
      state.createSetFetchStatus = status;
    },
    setfetchSetsStatus: (
      state,
      actions: PayloadAction<{ status: FetchStatus }>
    ) => {
      const { status } = actions.payload;
      state.fetchSetsStatus = status;
    },
    fetchCreateSetRequestSuccess: (state, actions: PayloadAction<Set>) => {
      state.sets.push({
        ...actions.payload,
        fetchStatus: FetchStatus.NotFetched,
      });
      state.createSetFetchStatus = FetchStatus.Fetched;
    },
    fetchCreateSetRequestError: (
      state,
      actions: PayloadAction<{ createdId: string }>
    ) => {
      const { createdId } = actions.payload;
      state.sets = state.sets.filter((i) => i.id !== createdId);
    },
    setSelectedSetId: (state, actions: PayloadAction<string>) => {
      state.selectedSetId = actions.payload;
    },
    fetchSetsRequestSuccess: (state, actions: PayloadAction<Set[]>) => {
      state.sets = actions.payload;
      state.fetchSetsStatus = FetchStatus.Fetched;
    },
    fetchUpdateSetRequest: (
      state,
      actions: PayloadAction<
        Pick<
          Set,
          "id" | "amount" | "name" | "projectDoc" | "objectConstruction"
        >
      >
    ) => {
      const index = state.sets.findIndex((i) => i.id === actions.payload.id);

      state.sets[index] = {
        ...state.sets[index],
        ...actions.payload,
        fetchStatus: FetchStatus.Fetching,
      };
    },
    fetchUpdateSetRequestSuccess: (
      state,
      actions: PayloadAction<Pick<Set, "id">>
    ) => {
      const index = state.sets.findIndex((i) => i.id === actions.payload.id);

      state.sets[index] = {
        ...state.sets[index],
        fetchStatus: FetchStatus.Fetched,
      };
    },
  },
});
export default setSlice.reducer;
