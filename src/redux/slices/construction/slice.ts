import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

export type ConstructionWithoutStatus = Pick<Construction, "id" | "name">;
export type ConstructionId = Pick<Construction, "id">;

export type Construction = {
  id: string;
  name: string;
  fetchStatus: FetchStatus;
};

interface IState {
  constructions: ConstructionWithoutStatus[];
  constructionsBySet: Construction[];
  status: FetchStatus;
}

const initialState: IState = {
  constructions: [],
  constructionsBySet: [],
  status: FetchStatus.NotFetched,
};

export const constructionSlice = createSlice({
  name: "construction",
  initialState,
  reducers: {
    fetchConstructionsRequestSuccess: (
      state,
      action: PayloadAction<ConstructionWithoutStatus[]>
    ) => {
      state.constructions = action.payload;
    },
    fetchAddConstructionsRequest: (
      state,
      action: PayloadAction<ConstructionWithoutStatus[]>
    ) => {
      state.constructionsBySet = state.constructionsBySet.concat(
        action.payload.map((e) => {
          return { id: e.id, name: e.name, fetchStatus: FetchStatus.Fetching };
        })
      );
    },
    fetchAddConstructionsRequestSuccess: (
      state,
      action: PayloadAction<ConstructionWithoutStatus[]>
    ) => {
      const ids = action.payload.map((e) => e.id);
      state.constructionsBySet = state.constructionsBySet.map((e) => {
        if (ids.includes(e.id))
          return { ...e, fetchStatus: FetchStatus.Fetched };
        return e;
      });
    },
    fetchDeleteConstructionFromSetRequest: (
      state,
      action: PayloadAction<ConstructionId>
    ) => {
      const index = state.constructionsBySet.findIndex(
        (i) => i.id === action.payload.id
      );
      state.constructionsBySet[index] = {
        ...state.constructionsBySet[index],
        fetchStatus: FetchStatus.Fetching,
      };
    },
    fetchDeleteConstructionFromSetRequestSuccess: (
      state,
      action: PayloadAction<ConstructionId>
    ) => {
      state.constructionsBySet = state.constructionsBySet.filter(
        (i) => i.id !== action.payload.id
      );
    },
  },
});
export default constructionSlice.reducer;
