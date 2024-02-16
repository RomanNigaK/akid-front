import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { nanoid } from "@reduxjs/toolkit";
import Input from "components/commons/Input";
import Button from "components/commons/button";
import Submit from "components/commons/submit/Submit";
import Text from "components/commons/text";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuthor } from "redux/slices/profile/selectors";

import {
  FetchCreateSet,
  fetchCreateSetRequestAction,
  setFetchStatusCreateSet,
} from "redux/slices/set/actions";
import { getCreateSetStatus } from "redux/slices/set/selectors";
import { FetchStatus } from "redux/types";
import { schemaCreateSet } from "schema/createSet";

type CreateSetFormProps = {
  onClose: () => void;
};

export default function CreateSetForm({ onClose}: CreateSetFormProps) {
  const author = useAppSelector(getAuthor);
  const createStatus = useAppSelector(getCreateSetStatus);

  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm<FetchCreateSet>({
    resolver: yupResolver(schemaCreateSet),
    defaultValues: {
      id: nanoid(),
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FetchCreateSet> = (data) => {
    if (author) dispatch(fetchCreateSetRequestAction(data));
  };

  useEffect(() => {
    if(createStatus===FetchStatus.Fetched)
    setTimeout(() => {
      dispatch(setFetchStatusCreateSet({status:FetchStatus.NotFetched}))
      onClose()},1500);
  }, [createStatus, dispatch, onClose]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Создание комплекта</h3>
      <Input
        placeholder="Наименование комплекта"
        name="name"
        value={() => getValues("name")}
        onChange={(val) => setValue("name", val)}
        error={errors.name?.message}
        onFocus={() => clearErrors("name")}
      />
      <Input
        placeholder="Проектная документация"
        name="projectDoc"
        onChange={(val) => setValue("projectDoc", val)}
        error={errors.projectDoc?.message}
        onFocus={() => clearErrors("projectDoc")}
      />
      <Input
        placeholder="Количество экземпляров"
        name="amount"
        onChange={(val) => setValue("amount", Number(val))}
        error={errors.amount?.message}
        onFocus={() => clearErrors("amount")}
      />
      <Text
        placeholder="Объект строительства"
        name="objectConstruction"
        onChange={(val) => setValue("objectConstruction", val)}
        error={errors.objectConstruction?.message}
        onFocus={() => clearErrors("objectConstruction")}
      />
      <Submit id="createSet" />
      <Button
        title="Создать комплект"
        idHtml="createSet"
        status={createStatus}
      />
    </form>
  );
}
