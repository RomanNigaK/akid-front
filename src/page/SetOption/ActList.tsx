import { useAppSelector } from "@hooks/redux.hook";
import { getActsBySet } from "redux/slices/act/selectors";



export default function ActList() {
  const acts = useAppSelector(getActsBySet);
  return (
    <>
    <h3>Выбранные типы конструкций</h3>  
    {acts.length===0 && <b>Нет связаных актов</b>}  
      <ul>
        {acts.map((e)=>{ 
            return(
                <li key={e.id}>
                  <span>{e.designation}</span>
                  <small>{e.name}</small>
                  </li>
            )
        })}
      </ul>
    </>
  );
}
