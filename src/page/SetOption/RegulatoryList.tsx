import { useAppSelector } from "@hooks/redux.hook";
import { getRequlationsBySet } from "redux/slices/requlatory/selectors";

export default function RegulatoryList() {
  const requlations = useAppSelector(getRequlationsBySet);
  return (
    <>
    <h3>Связанные нормативные документы</h3>  
    {requlations.length===0 && <b>Нет связаных актов</b>}  
      <ul>
        {requlations.map((e)=>{
            return(
                <li key={e.id}>
                  <span>{e.designation}</span>
                  <small>{e.name}</small>
                  </li>
            )
        })}
      </ul>
    </>
  )
}
