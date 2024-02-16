import { Link, Outlet } from "react-router-dom";
import IconProfile from "@static/icon/profile.svg";
import IconComplect from "@static/icon/complect.svg";
import IconOption from "@static/icon/option.svg";
import Tooltip from "components/commons/tooltip";
import IconButton from "components/commons/IconButton";
import IconAdd from "@static/icon/add.svg";
import { useEffect, useState } from "react";
import Modal from "components/modal/Modal";
import CreateSetForm from "components/form/CreateSetForm";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { fetchSetsRequestAction, setFetchStatusCreateSet } from "redux/slices/set/actions";
import { FetchStatus } from "redux/types";
import { getOptionsUrl, getProfileUrl, getSetsUrl } from "Routing";
import { getFetchSetsStatus, getSets } from "redux/slices/set/selectors";
import preloader from "@static/gif/main.gif";
import error from "@static/icon/error.svg";
import cn from "classnames";

export default function LayoutMain() {
  const dispatch = useAppDispatch();
  const [isVisbleModal, setIsVisibleModal] = useState(false);

  const handleCreateSet = () => {
    setIsVisibleModal(true);
    dispatch(setFetchStatusCreateSet({ status: FetchStatus.NotFetched }));
  };

  const fetchSetsStatus = useAppSelector(getFetchSetsStatus);
  const sets = useAppSelector(getSets);

  useEffect(() => {
    dispatch(fetchSetsRequestAction({companyId:"sdfsdf"}))
  }, [dispatch]);

  return (
    <>
      {isVisbleModal && (
        <Modal onClose={() => setIsVisibleModal(false)}>
          <CreateSetForm onClose={() => setIsVisibleModal(false)} />
        </Modal>
      )}
      <div>
        <div className="layout-main">
          <div className="layout-main__main-menu">
            <Link to={getProfileUrl()}>
              <Tooltip title="Профиль">
                <img src={IconProfile} alt="" className="animation-scale" />
              </Tooltip>
            </Link>
            <Link to={getSetsUrl()}>
              <Tooltip title="Комплекты">
                <img src={IconComplect} alt="" className="animation-scale" />
              </Tooltip>
            </Link>
            <Link to={getOptionsUrl()}>
              <Tooltip title="Настройки">
                <img src={IconOption} alt="" className="animation-scale" />
              </Tooltip>
            </Link>
          </div>
          <div className="layout-main__main">
            <div className="layout-main__main__header">
              <h2>Комплекты</h2>
              <IconButton onClick={() => handleCreateSet()}>
                <img src={IconAdd} alt="" className="animation-rotate" />
                Добавить комплект
              </IconButton>
            </div>
            <div
              className={cn("layout-main__main__content", {
                preloader:
                  fetchSetsStatus === FetchStatus.Fetching ||
                  fetchSetsStatus === FetchStatus.Error ||
                  sets.length === 0,
              })}
            >
              {fetchSetsStatus === FetchStatus.Fetching && (
                <img src={preloader} alt="" />
              )}
              {/* <Set>  отображаеться*/}
              {fetchSetsStatus === FetchStatus.Fetched && <Outlet />}
              {/*  компонента ошибка загрузки */}
              {fetchSetsStatus === FetchStatus.Error && (
                <span>
                  <img src={error} alt="Ошибка загрузки" /> Ошибка загрузки!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
