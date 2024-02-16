import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { getConstructionsBySet } from "redux/slices/construction/selectors";
import iconBasket from "@static/icon/basket.svg";
import sass from "./style.module.sass";
import { fetchDeleteConstructionFromSetRequest } from "redux/slices/construction/actions";

export default function ConstructionList() {
  const dispatch = useAppDispatch();
  const constructions = useAppSelector(getConstructionsBySet);

  const handleDelete=(id:string)=>{
    dispatch(fetchDeleteConstructionFromSetRequest({id}));
  }
  return (
    <>
      <h3>Выбранные типы конструкций</h3>
      {constructions.length === 0 && <b>У вас нет выбранных конструкций</b>}
      <ul>
        {constructions.map((e) => {
          return (
            <li key={e.id} className={sass.li_delete}>
              <img src={iconBasket} alt="" className="animation-scale" onClick={()=>handleDelete(e.id)}/>
              <span>{e.name}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
