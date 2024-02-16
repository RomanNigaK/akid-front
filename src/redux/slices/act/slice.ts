import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

export type Act = {
  id: string;
  name: string;
  designation: string;
  template:string;
};

interface IState {
  acts: Act[];
  actsBySet: Act[]
  status: FetchStatus;
}

const initialState: IState = {
  acts: [],
  actsBySet: [],
  status: FetchStatus.NotFetched,
};

export const actSlice = createSlice({
  name: "act",
  initialState,
  reducers: {
    fetchActsRequestSuccess:(state,action:PayloadAction<Act[]>)=>{
      state.acts = action.payload
    },
    fetchActsBySetRequestSuccess:(state,action:PayloadAction<Act[]>)=>{
      state.actsBySet = action.payload
    },
    
  },
});
export default actSlice.reducer;
