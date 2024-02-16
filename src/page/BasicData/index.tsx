import IconButton from "components/commons/IconButton";
import IconAdd from "@static/icon/add.svg";
import { useEffect, useState } from "react";
import PopupPerson from "components/commons/popup/PopupPerson";
import Modal, { ModalSize } from "components/modal/Modal";
import PersonForm from "components/form/PersonForm";
import { TypePerson } from "constans/emuns";
import SearchForm from "components/form/Search";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { useParams } from "react-router";
import { fetchPersonRequestAction } from "redux/slices/person/actions";
import { getPersons } from "redux/slices/person/selectors";
import { PersonPhases } from "constans/phrases";
import { nanoid } from "@reduxjs/toolkit";
import representative from "@static/icon/representative.svg";
import buildControl from "@static/icon/buildControl.svg";
import uploadIcon from "@static/icon/upload.svg";
import cn from "classnames";
import { FetchStatus } from "redux/types";
import RepresentativeForm from "components/form/RepresentativeForm";
import {
  OtherPerson,
  Representative,
  TypeRepresentative,
} from "redux/slices/person/slice";
import OtherPersonForm from "components/form/OtherPersonForm";
import { dataRepresentativetoStr } from "utils/dataToSrt";

export default function BasicData() {
  const [isPopup, setIsPopup] = useState(false);
  const [isVisbleModal, setIsVisibleModal] = useState(false);
  const [form, setForm] = useState<JSX.Element>();
  const [component, setComponent] = useState<JSX.Element>();
  const [modalSize, setModalsize] = useState<keyof typeof ModalSize>("small");

  const { setId } = useParams();
  const dispatch = useAppDispatch();
  const persons = [
    TypePerson.developer,
    TypePerson.personcCrryingConstruction,
    TypePerson.personPreparingProjectDocumentation,
    TypePerson.operatingOrganization,
    TypePerson.personPerformedSubjectInspection,
    TypePerson.otherPersonsParticipatingExamination,
  ];

  const personsBySet = useAppSelector(getPersons);

  const handleAddPerson = (person: keyof typeof TypePerson) => {
    setIsVisibleModal(true);
    setIsPopup(false);
    if (person !== "otherPersonsParticipatingExamination")
      return setForm(
        <PersonForm
          onClose={() => setIsVisibleModal(false)}
          person={person}
          updateModalsize={hadleShowComponent}
        />
      );
    setForm(
      <OtherPersonForm
        onClose={() => setIsVisibleModal(false)}
        updateModalsize={hadleShowComponent}
      />
    );
  };

  const handleEditPerson = (person: keyof typeof TypePerson, data: string) => {
    setIsVisibleModal(true);
    setForm(
      <PersonForm
        onClose={() => setIsVisibleModal(false)}
        person={person}
        updateModalsize={hadleShowComponent}
        data={data}
      />
    );
  };
  const handleEditOtherPerson = (data?: OtherPerson) => {
    setIsVisibleModal(true);
    setForm(
      <OtherPersonForm
        onClose={() => setIsVisibleModal(false)}
        updateModalsize={hadleShowComponent}
        data={data}
      />
    );
  };

  const handleDestroyComponent = () => {
    setModalsize("toSmallFromMedium");
    setComponent(undefined);
  };
  const hadleShowComponent = () => {
    setModalsize("toMediumFromSmall");
    setComponent(<SearchForm onClose={handleDestroyComponent} />);
  };

  const handleRepresentative = (
    person: keyof typeof TypePerson,
    type: TypeRepresentative,
    data?: Representative | null
  ) => {
    setIsVisibleModal(true);
    setForm(
      <RepresentativeForm
        onClose={() => setIsVisibleModal(false)}
        person={person}
        updateModalsize={hadleShowComponent}
        type={type}
        data={data}
      />
    );
  };

  useEffect(() => {
    if (setId) dispatch(fetchPersonRequestAction({ setId }));
  }, [dispatch, setId]);

  return (
    <>
      {isVisbleModal && (
        <Modal onClose={() => setIsVisibleModal(false)} size={modalSize}>
          {form}
          {component ? component : null}
        </Modal>
      )}
      <IconButton onClick={() => setIsPopup(true)}>
        <img src={IconAdd} alt="" className="animation-rotate" />
        Добавить компанию
      </IconButton>
      {isPopup && (
        <PopupPerson
          person={persons}
          action={(person) => handleAddPerson(person)}
          onClose={() => setIsPopup(false)}
        />
      )}
      <div className="list-persons">
        {persons.map((e) => {
          const obj = personsBySet && personsBySet[e];
          return (
            <>
              {obj && (
                <>
                  <h3>{PersonPhases[e]}</h3>
                  <ul>
                    {"data" in obj ? (
                      <>
                        <li
                          onClick={() => handleEditPerson(e, obj.data)}
                          className={cn({
                            delete: obj.fetchStatus === FetchStatus.Fetching,
                          })}
                        >
                          {obj.data}
                        </li>
                        <ul>
                          <li>
                            <img src={representative} alt="" />
                            <span>
                              {!!obj.representative || (
                                <>
                                  <span>Не указан</span>
                                  <IconButton
                                    onClick={() =>
                                      handleRepresentative(e, "representative")
                                    }
                                  >
                                    <img
                                      src={IconAdd}
                                      alt=""
                                      className="animation-rotate"
                                    />
                                    Добавить представителя
                                  </IconButton>
                                </>
                              )}
                              {!!obj.representative && (
                                <>
                                  <span
                                    onClick={() =>
                                      handleRepresentative(
                                        e,
                                        "representative",
                                        obj.representative
                                      )
                                    }
                                  >
                                    {!!obj.representative &&
                                      dataRepresentativetoStr(
                                        obj.representative
                                      )}
                                  </span>
                                  <div>
                                    <IconButton>
                                      <img
                                        src={uploadIcon}
                                        alt=""
                                        className="animation-rotate"
                                      />
                                      Загрузить документ
                                    </IconButton>
                                  </div>
                                </>
                              )}
                            </span>
                          </li>
                          {e === "personcCrryingConstruction" && (
                            <li>
                              <img src={buildControl} alt="" />
                              <span>
                                {!!obj.buildControl || (
                                  <>
                                    <span>Не указан</span>
                                    <IconButton
                                      onClick={() =>
                                        handleRepresentative(e, "buildControl")
                                      }
                                    >
                                      <img
                                        src={IconAdd}
                                        alt=""
                                        className="animation-rotate"
                                      />
                                      Добавить стройконтроль
                                    </IconButton>
                                  </>
                                )}
                                {!!obj.buildControl && (
                                  <>
                                    <span
                                      onClick={() =>
                                        handleRepresentative(
                                          e,
                                          "representative",
                                          obj.buildControl
                                        )
                                      }
                                    >
                                      {dataRepresentativetoStr(
                                        obj.buildControl
                                      )}
                                    </span>
                                    <div>
                                      <IconButton>
                                        <img
                                          src={uploadIcon}
                                          alt=""
                                          className="animation-rotate"
                                        />
                                        Загрузить документ
                                      </IconButton>
                                    </div>
                                  </>
                                )}
                              </span>
                            </li>
                          )}
                        </ul>
                      </>
                    ) : (
                      <>
                        {obj.map((e) => {
                          return (
                            <li
                              key={nanoid()}
                              onClick={() => handleEditOtherPerson(e)}
                              className={cn({
                                delete: e.fetchStatus === FetchStatus.Fetching,
                              })}
                            >
                              {e.data}
                            </li>
                          );
                        })}
                        <IconButton onClick={() => handleEditOtherPerson()}>
                          <img
                            src={IconAdd}
                            alt=""
                            className="animation-rotate"
                          />
                          Добавить представителя
                        </IconButton>
                      </>
                    )}
                  </ul>
                </>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
