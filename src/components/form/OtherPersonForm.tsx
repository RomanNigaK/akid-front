import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { nanoid } from "@reduxjs/toolkit";
import Button from "components/commons/button";
import Favorites from "components/commons/favorites";
import Submit from "components/commons/submit/Submit";
import Text from "components/commons/text";
import { TimeAutoClosedModal } from "constans/emuns";
import { metaDataFormPeson } from "constans/metaData";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { showModal } from "utils/showModal";
import {
  fetchAddOtherPersonRequest,
  fetchDeleteOtherPersonRequest,
  fetchUpdateOtherPersonRequest,
  updateOtherPersonStatus,
} from "redux/slices/person/actions";
import { getLastAddOtherPerson } from "redux/slices/person/selectors";
import { OtherPerson } from "redux/slices/person/slice";
import { FetchStatus } from "redux/types";
import { Confirm } from "components/commons/confirm";
import { ConfirmPhases } from "constans/phrases";
import { schemaOtherPerson } from "schema/otherPerson";
import Input from "components/commons/Input";

type OtherPersonFormProps = {
  onClose: () => void;
  updateModalsize: () => void;
  data?: OtherPerson;
};

export default function OtherPersonForm({
  onClose,
  updateModalsize,
  data,
}: OtherPersonFormProps) {
  const lastAddOtherPerson = useAppSelector(getLastAddOtherPerson);
  const isEdit = !!data;
  const {
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Pick<OtherPerson, "data" | "surnameInitials">>({
    resolver: yupResolver(schemaOtherPerson),
    defaultValues: {
      surnameInitials: data?.surnameInitials,
      data: data?.data,
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Pick<
    OtherPerson,
    "data" | "surnameInitials"
  >> = (dataOtherPerson) => {
    if (isEdit)
      return dispatch(
        fetchUpdateOtherPersonRequest({ ...dataOtherPerson, id: data.id })
      );
    dispatch(fetchAddOtherPersonRequest({ ...dataOtherPerson, id: nanoid() }));
  };

  const deleteHandle = () => {
    onClose();
    if (data?.id) dispatch(fetchDeleteOtherPersonRequest({ id: data.id }));
  };

  useEffect(() => {
    if (lastAddOtherPerson?.fetchStatus === FetchStatus.Fetched) {
      setTimeout(() => {
        onClose();
        dispatch(
          updateOtherPersonStatus({
            id: data?.id || lastAddOtherPerson.id,
            status: FetchStatus.NotFetched,
          })
        );
      }, TimeAutoClosedModal.timer);
    }
  }, [lastAddOtherPerson, dispatch, getValues, onClose, data?.id, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>
        {metaDataFormPeson.otherPersonsParticipatingExamination.title}
        <Favorites updateModalsize={updateModalsize} />
      </h3>

      <Input
        value={data?.surnameInitials}
        placeholder="Фамилия и инициаллы"
        name="surnameInitials"
        onChange={(val) => setValue("surnameInitials", val)}
        error={errors.surnameInitials?.message}
        onFocus={() => clearErrors("surnameInitials")}
      />

      <Text
        placeholder="Наименование"
        name="data"
        value={data?.data}
        onChange={(val) => setValue("data", val)}
        error={errors.data?.message}
        onFocus={() => clearErrors("data")}
        description={
          metaDataFormPeson.otherPersonsParticipatingExamination.discription
        }
      />

      <Submit id="addPerson" />
      <Button
        title={data ? "Сохранить изменения" : "Добавить"}
        idHtml="addPerson"
        status={lastAddOtherPerson?.fetchStatus}
      />
      {data && (
        <Button
          theme="blue"
          title="Удалить представителя"
          action={() =>
            showModal(Confirm, ConfirmPhases.deleteOtherPerson, deleteHandle)
          }
        />
      )}
    </form>
  );
}
