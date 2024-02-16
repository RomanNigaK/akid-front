import { Link, Outlet } from "react-router-dom";
import IconProfile from "@static/icon/profile.svg";
import IconComplect from "@static/icon/complect.svg";
import IconBasicData from "@static/icon/basic-data.svg";
import IconOptionComplect from "@static/icon/basic-option.svg";
import IconCapture from "@static/icon/capture.svg";
import IconOption from "@static/icon/option.svg";
import IconReestr from "@static/icon/reestr.svg";
import Tooltip from "components/commons/tooltip";
import IconButton from "components/commons/IconButton";
import IconOptionSet from "@static/icon/option-set.svg";
import { useState } from "react";
import Modal from "components/modal/Modal";
import EditSetForm from "components/form/EditSetForm";
import { getBasicDataUrl, getCaptureUrl, getOptionsUrl, getProfileUrl, getReqistryUrl, getSetOptionUrl, getSetsUrl } from "Routing";
import { useAppSelector } from "@hooks/redux.hook";
import { getSelectedSet, getSelectedSetId } from "redux/slices/set/selectors";

export default function LayoutDesktop() {
  const [isVisbleModal, setIsVisibleModal] = useState(false);
  
  const selectedId = useAppSelector(getSelectedSetId);
  const selectedSet  = useAppSelector(getSelectedSet);


  
  return (
    <>
      {isVisbleModal && (
        <Modal onClose={() => setIsVisibleModal(false)}>
          <EditSetForm onClose={()=>setIsVisibleModal(false)} set={selectedSet} />
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
            <Link to={getBasicDataUrl(selectedId)}>
              <Tooltip title="Общие данные">
                <img src={IconBasicData} alt="" className="animation-scale" />
              </Tooltip>
            </Link>
            <Link to={getSetOptionUrl(selectedId)}>
              <Tooltip title="Настроики комплекта">
                <img
                  src={IconOptionComplect}
                  alt=""
                  className="animation-scale"
                />
              </Tooltip>
            </Link>
            <Link to={getCaptureUrl(selectedId)}>
              <Tooltip title="Захватки">
                <img src={IconCapture} alt="" className="animation-scale" />
              </Tooltip>
            </Link>
            <Link to={getReqistryUrl(selectedId)}>
              <Tooltip title="Реестр">
                <img src={IconReestr} alt="" className="animation-scale" />
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
              <h2>{selectedSet?.name}</h2>
              <IconButton onClick={() => setIsVisibleModal(true)}>
                <img src={IconOptionSet} alt="" className="animation-rotate" />
                Настройки комплекта
              </IconButton>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
