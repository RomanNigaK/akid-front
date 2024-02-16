import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

export type Requlatory = {
  id: string;
  name: string;
  designation: string;
};

interface IState {
  requlations: Requlatory[];
  requlationsBySet: Requlatory[];
  status: FetchStatus;
}

const initialState: IState = {
  requlations: [],
  requlationsBySet: [],
  status: FetchStatus.NotFetched,
};

export const requlatorySlice = createSlice({
  name: "requlatory",
  initialState,
  reducers: {
    fetchRequlationsRequestSuccess: (
      state,
      action: PayloadAction<Requlatory[]>
    ) => {
      state.requlations = action.payload;
    },
    fetchRequlationsBySetRequestSuccess:(state,action:PayloadAction<Requlatory[]>)=>{
      state.requlationsBySet = action.payload;
    },
  },
});
export default requlatorySlice.reducer;
