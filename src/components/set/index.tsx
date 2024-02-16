import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { getBasicDataUrl } from "Routing";
import { useNavigate } from "react-router";
import { setSelectedSetId } from "redux/slices/set/actions";
import { getSets } from "redux/slices/set/selectors";
import box from "@static/icon/box.svg";
import { useLayoutEffect } from "react";

export default function Set() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sets = useAppSelector(getSets);
  const handleSelectSet = (setId: string) => {
    dispatch(setSelectedSetId(setId));
    navigate(getBasicDataUrl(setId));
  };


  useLayoutEffect(()=>{
    dispatch(setSelectedSetId(""))
  },[dispatch])
  return (
    <>
      {sets.length > 0 && (
        <div className="table">
          <div className="table__row table-header">
            <div className="table__cell-name">Наименование</div>
            <div className="table__cell-doc">Проектная документация</div>
            <div className="table__cell">Экземпляры</div>
            <div className="table__cell">Статус</div>
            <div className="table__cell">Автор</div>
          </div>
          {sets.map((e) => {
            const author = `${e.author.sername} ${e.author.name.charAt(0)}.`;
            return (
              <div
                className="table__row table-row"
                key={e.id}
                onClick={() => handleSelectSet(e.id)}
              >
                <div className="table__cell-name">{e.name}</div>
                <div className="table__cell-doc">{e.projectDoc}</div>
                <div className="table__cell">{e.amount}</div>
                <div className="table__cell-status">
                  <div className={`${e.status.toLocaleLowerCase()}`}></div>
                </div>
                <div className="table__cell">{author}</div>
              </div>
            );
          })}
        </div>
      )}
      {sets.length === 0 && (
        <div className="system-message">
          <img src={box} alt="" /> <h2>Список комплектов пуст</h2>
        </div>
      )}
    </>
  );
}
