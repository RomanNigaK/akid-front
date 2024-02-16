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
  fetchCreateSetRequestAction,
  fetchUpdateSetRequest,
  setFetchStatusCreateSet,
} from "redux/slices/set/actions";
import { getCreateSetStatus } from "redux/slices/set/selectors";
import { Set } from "redux/slices/set/slice";
import { FetchStatus } from "redux/types";
import { schemaCreateSet } from "schema/createSet";

type CreateSetFormProps = {
  onClose: () => void;
  set?: Set;
};

export default function EditSetForm({ onClose, set }: CreateSetFormProps) {
  const author = useAppSelector(getAuthor);
  const createStatus = useAppSelector(getCreateSetStatus);

  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<
    Pick<Set, "id" | "amount" | "name" | "projectDoc" | "objectConstruction">
  >({
    resolver: yupResolver(schemaCreateSet),
    defaultValues: {
      id: set?.id || nanoid(),
      amount: set?.amount,
      name: set?.name,
      objectConstruction: set?.objectConstruction,
      projectDoc: set?.projectDoc,
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Pick<
    Set,
    "id" | "amount" | "name" | "projectDoc" | "objectConstruction"
  >> = (data) => {
    if (set) dispatch(fetchUpdateSetRequest(data));
    if (author) dispatch(fetchCreateSetRequestAction(data));
  };

  useEffect(() => {
    if (createStatus === FetchStatus.Fetched)
      setTimeout(() => {
        dispatch(setFetchStatusCreateSet({ status: FetchStatus.NotFetched }));
        onClose();
      }, 1500);
  }, [createStatus, dispatch, onClose]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Настройки комплекта</h3>
      <Input
        placeholder="Наименование комплекта"
        name="name"
        value={set?.name}
        onChange={(val) => setValue("name", val)}
        error={errors.name?.message}
        onFocus={() => clearErrors("name")}
      />
      <Input
        value={set?.projectDoc}
        placeholder="Проектная документация"
        name="projectDoc"
        onChange={(val) => setValue("projectDoc", val)}
        error={errors.projectDoc?.message}
        onFocus={() => clearErrors("projectDoc")}
      />
      <Input
        value={set?.amount}
        placeholder="Количество экземпляров"
        name="amount"
        onChange={(val) => setValue("amount", Number(val))}
        error={errors.amount?.message}
        onFocus={() => clearErrors("amount")}
      />
      <Text
        value={set?.objectConstruction}
        placeholder="Объект строительства"
        name="objectConstruction"
        onChange={(val) => setValue("objectConstruction", val)}
        error={errors.objectConstruction?.message}
        onFocus={() => clearErrors("objectConstruction")}
      />
      <Submit id="createSet" />
      <Button
        title="Сохранить изменения"
        idHtml="createSet"
        status={createStatus}
      />
      <Button title="Удалить комплект" theme="blue" />
    </form>
  );
}
