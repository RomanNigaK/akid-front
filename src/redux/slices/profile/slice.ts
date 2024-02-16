import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "redux/types";

export type Profile = {
  id: string;
  sername: string;
  name: string;
  email: string;
  post: string;
  phone: number;
};

interface IState {
  profile: Profile | null;
  status: FetchStatus;
}

const initialState: IState = {
  profile: {
    id: "NEXHVzAx6AWtBAkBaAWsN",
    email: "1@1.ru",
    name: "Роман",
    phone: 89182189865,
    sername: "Кулиш",
    post:"Director"
  },
  status: FetchStatus.NotFetched,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setStatus: (state) => {
      state.status = FetchStatus.Fetching;
    },
    fetchRegRequestSeccess: (state, actions: PayloadAction<Profile>) => {
      state.profile = actions.payload;
      state.status = FetchStatus.Fetched;
    },
  },
});
export default profileSlice.reducer;
