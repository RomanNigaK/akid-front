import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import WrapperDesktop from "components/WrapperDesktop";
import LayoutAuth from "components/layout/layoutAuth";
import LayoutDesktop from "components/layout/layoutDesktop";
import LayoutMain from "components/layout/layoutMain";
import LayoutMainOption from "components/layout/layoutMainOption";
import LayoutMainProfile from "components/layout/layoutMainProfile";
import Set from "components/set";
import Auth from "page/Auth";
import BasicData from "page/BasicData";
import Capture from "page/Capture";
import Options from "page/Options";
import Profile from "page/Profile";
import Reg from "page/Reg";
import Registry from "page/Registry";
import SetOption from "page/SetOption";
import { PropsWithChildren } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { setSelectedSetId } from "redux/slices/set/actions";
import { getSelectedSetId } from "redux/slices/set/selectors";
import { SetId } from "redux/slices/set/slice";

export const getSetsUrl = () => "/";
export const getProfileUrl = () => "/profile";
export const getOptionsUrl = () => "/options";
export const getBasicDataUrl = (setId: SetId) => `/set/${setId}/basic-data`;
export const getSetOptionUrl = (setId: SetId) => `/set/${setId}/set-option`;
export const getCaptureUrl = (setId: SetId) => `/set/${setId}/capture`;
export const getReqistryUrl = (setId: SetId) => `/set/${setId}/registry`;

export default function RequireAuth({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  // useLayoutEffect(() => {
  //   navigate("/auth");
  // }, [navigate]);

  return <>{children}</>;
}

export function Routing() {
  const selectedSet = useAppSelector(getSelectedSetId);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            {selectedSet ? <LayoutDesktop /> : <LayoutMain />}
          </RequireAuth>
        }
      >
        <Route index element={<Set />} />
        <Route
          path="set/:setId/basic-data"
          element={
            <WrapperDesktop>
              <BasicData />
            </WrapperDesktop>
          }
        />
        <Route
          path="set/:setId/set-option"
          element={
            <WrapperDesktop>
              <SetOption />
            </WrapperDesktop>
          }
        />
        <Route
          path="set/:setId/capture"
          element={
            <WrapperDesktop>
              <Capture />
            </WrapperDesktop>
          }
        />
        <Route
          path="set/:setId/registry"
          element={
            <WrapperDesktop>
              <Registry />
            </WrapperDesktop>
          }
        />


      </Route>
      <Route path="profile" element={<LayoutMainProfile/>} >
        <Route index element={<Profile/>}/>
      </Route>
      <Route path="options" element={<LayoutMainOption/>} >
        <Route index element={<Options/>}/>
      </Route>
      <Route path="auth" element={<LayoutAuth />}>
        <Route index element={<Auth />} />
        <Route path="reg" element={<Reg />} />
      </Route>
    </Routes>
  );
}
