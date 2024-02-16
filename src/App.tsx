import { useEffect } from "react";
import "./style/global.scss";
import "./style/sass/index.sass";
import { Routing } from "Routing";
import { useAppDispatch } from "@hooks/redux.hook";
import { fetchConstructionsRequestAction } from "redux/slices/construction/actions";
import { fetchActsRequestAction } from "redux/slices/act/actions";
import { v4 } from "uuid";
import { fetchRequlationsRequestAction } from "redux/slices/requlatory/actions";


export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchConstructionsRequestAction());
    dispatch(fetchActsRequestAction())
    dispatch(fetchRequlationsRequestAction())
  }, [dispatch]);

  // console.log(v4());
  // console.log(v4());
  // console.log(v4());
  // console.log(v4());
  // console.log(v4());
  // console.log(v4());

  
  return (
    <div>
      <Routing />
    </div>
  );
}
