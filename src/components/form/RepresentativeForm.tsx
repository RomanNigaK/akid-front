import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { nanoid } from "@reduxjs/toolkit";
import Button from "components/commons/button";
import Favorites from "components/commons/favorites";
import Submit from "components/commons/submit/Submit";
import { TimeAutoClosedModal, TypePerson } from "constans/emuns";
import {
  metaDataFormPeson,
  metaDataFormRepresentative,
} from "constans/metaData";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { showModal } from "utils/showModal";
import {
  fetchAddRepresentativeRequest,
  fetchDeleteRepresentativeRequest,
  updateStatusRepresentative,
} from "redux/slices/person/actions";
import { getcurrentPersonRepresentativeStatus } from "redux/slices/person/selectors";
import { Representative, TypeRepresentative } from "redux/slices/person/slice";
import { FetchStatus } from "redux/types";
import { Confirm } from "components/commons/confirm";
import { ConfirmPhases } from "constans/phrases";
import { schemaRepresentative } from "schema/representative";
import Input from "components/commons/Input";

type RepresentativeFormProps = {
  onClose: () => void;
  person: keyof typeof TypePerson;
  updateModalsize: () => void;
  data?: Representative | null;
  type: TypeRepresentative;
};

export default function RepresentativeForm({
  onClose,
  person,
  updateModalsize,
  data,
  type,
}: RepresentativeFormProps) {
  const isUpdate = !!data;
  const currentPersonRepresentativeStatus = useAppSelector((state) =>
    getcurrentPersonRepresentativeStatus(state, person, type)
  );
  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<
    Pick<
      Representative,
      "id" | "surnameInitials" | "nrc" | "order" | "postInCompany"
    >
  >({
    resolver: yupResolver(schemaRepresentative),
    defaultValues: {
      id: data?.id || nanoid(),
      surnameInitials: data?.surnameInitials,
      postInCompany: data?.postInCompany,
      nrc: data?.nrc,
      order: data?.order,
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Pick<
    Representative,
    "id" | "surnameInitials" | "nrc" | "order" | "postInCompany"
  >> = (data) => {
    dispatch(
      fetchAddRepresentativeRequest({
        representative: data,
        type: person,
        typeRepresentative: type,
      })
    );
  };

  const deleteHandle = () => {
    onClose();
    dispatch(
      fetchDeleteRepresentativeRequest({
        type: person,
        typeRepresentative: type,
      })
    );
  };

  useEffect(() => {
    if (currentPersonRepresentativeStatus === FetchStatus.Fetched) {
      setTimeout(() => {
        onClose();
        dispatch(
          updateStatusRepresentative({
            type: person,
            status: FetchStatus.NotFetched,
            typeRepresentative: type,
          })
        );
      }, TimeAutoClosedModal.timer);
    }
  }, [currentPersonRepresentativeStatus, dispatch, onClose, person, type]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>
        {metaDataFormRepresentative[type].title}
        <Favorites updateModalsize={updateModalsize} />
        <div>от {metaDataFormPeson[person].title}</div>
      </h3>

      <Input
        value={data?.surnameInitials}
        placeholder="Фамилия и инициаллы"
        name="surnameInitials"
        onChange={(val) => setValue("surnameInitials", val)}
        error={errors.surnameInitials?.message}
        onFocus={() => clearErrors("surnameInitials")}
      />
      <Input
        value={data?.postInCompany}
        placeholder="Должность и компания"
        name="postInCompany"
        onChange={(val) => setValue("postInCompany", val)}
        error={errors.postInCompany?.message}
        onFocus={() => clearErrors("postInCompany")}
      />

      <Input
        value={data?.nrc}
        placeholder="Номер специалиста"
        name="nrc"
        onChange={(val) => setValue("nrc", val)}
        error={errors.nrc?.message}
        onFocus={() => clearErrors("nrc")}
      />

      <Input
        value={data?.order}
        placeholder="Приказ"
        name=""
        onChange={(val) => setValue("nrc", val)}
        error={errors.nrc?.message}
        onFocus={() => clearErrors("nrc")}
      />

      <Submit id="addPerson" />
      <Button
        title={data ? "Сохранить изменения" : "Добавить"}
        idHtml="addPerson"
        status={currentPersonRepresentativeStatus}
      />
      {isUpdate && (
        <Button
          theme="blue"
          title="Удалить представителя"
          action={() =>
            showModal(Confirm, ConfirmPhases.deleteRepresentative, deleteHandle)
          }
        />
      )}
    </form>
  );
}
