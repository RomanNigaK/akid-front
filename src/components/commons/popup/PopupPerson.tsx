import { nanoid } from "@reduxjs/toolkit";
import closePopup from "@static/icon/delete.svg";
import { TypePerson } from "constans/emuns";
import { PersonPhases } from "constans/phrases";

type PopupProps = {
  person: (keyof typeof PersonPhases)[];
  action: (person:keyof typeof TypePerson) => void;
  onClose:()=>void;
};

export default function PopupPerson({ action, person,onClose }: PopupProps) {
  return (
    <div className="popup">
      <img src={closePopup} alt="закрыть" className="animation-rotate" onClick={onClose}/>
      <ul>
        {person.map((e) => {
          return (
            <>
              <li key={nanoid()} onClick={()=>action(e)}>
                <span />
                {PersonPhases[e]}
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
