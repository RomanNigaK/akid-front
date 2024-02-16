import { RootState } from "redux/store";

export const getRootProfile = (state: RootState) => state.profile;

export const getSatatusProfile = (state: RootState) => state.profile.status;

export const getAuthor = (state: RootState) => {
  const user = getRootProfile(state).profile;
  if(user)
  return { name: user.name, sername: user.sername };
    
  return null
};
