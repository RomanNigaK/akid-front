import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { nanoid } from "@reduxjs/toolkit";
import Button from "components/commons/button";
import Favorites from "components/commons/favorites";
import Submit from "components/commons/submit/Submit";
import Text from "components/commons/text";
import { TimeAutoClosedModal, TypePerson } from "constans/emuns";
import { metaDataFormPeson } from "constans/metaData";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { showModal } from "utils/showModal";
import {
  fetchAddPersonRequest,
  fetchDeletePersonRequest,
  fetchUpdatePersonRequest,
  fetchUpdateStatusPerson,
} from "redux/slices/person/actions";
import { getCurrentPersonStatus } from "redux/slices/person/selectors";
import { Person } from "redux/slices/person/slice";
import { FetchStatus } from "redux/types";

import { schemaPerson } from "schema/person";
import { Confirm } from "components/commons/confirm";
import { ConfirmPhases } from "constans/phrases";

type PersonFormProps = {
  onClose: () => void;
  person: keyof typeof TypePerson;
  updateModalsize: () => void;
  data?: string;
};

export default function PersonForm({
  onClose,
  person,
  updateModalsize,
  data,
}: PersonFormProps) {
  const isUpdate = !!data;
  const currentPersonStatus = useAppSelector((state) =>
    getCurrentPersonStatus(state, person)
  );
  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<Pick<Person, "id" | "data">>({
    resolver: yupResolver(schemaPerson),
    defaultValues: {
      id: nanoid(),
      data: data,
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Pick<Person, "id" | "data">> = (data) => {
    if (isUpdate)
      return dispatch(fetchUpdatePersonRequest({ type: person, person: data }));
    dispatch(fetchAddPersonRequest({ type: person, person: data }));
  };

  const deleteHandle = () => {
    onClose();
    dispatch(fetchDeletePersonRequest({type:person}))
  };

  useEffect(() => {
    if (currentPersonStatus === FetchStatus.Fetched) {
      setTimeout(() => {
        onClose();
        dispatch(
          fetchUpdateStatusPerson({
            type: person,
            status: FetchStatus.NotFetched,
          })
        );
      }, TimeAutoClosedModal.timer);
    }
  }, [currentPersonStatus, dispatch, onClose, person]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>
        {metaDataFormPeson[person].title}
        <Favorites updateModalsize={updateModalsize} />
      </h3>

      <Text
        placeholder="Наименование"
        name="data"
        value={data}
        onChange={(val) => setValue("data", val)}
        error={errors.data?.message}
        onFocus={() => clearErrors("data")}
        description={metaDataFormPeson[person].discription}
      />

      <Submit id="addPerson" />
      <Button
        title={data ? "Сохранить изменения" : "Добавить"}
        idHtml="addPerson"
        status={currentPersonStatus}
      />
      {data && (
        <Button
          theme="blue"
          title="Удалить компаниию"
          action={() =>
            showModal(Confirm, ConfirmPhases.deleteCompanyFromBasicData, deleteHandle)
          }
        />
      )}
    </form>
  );
}
