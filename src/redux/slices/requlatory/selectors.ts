import { RootState } from "redux/store";

export const getRootRequlatory = (state: RootState) => state.requlatory;

export const getRequlationsBySet = (state: RootState) => getRootRequlatory(state).requlationsBySet;

export const getRequlations = (state: RootState) => getRootRequlatory(state).requlations;