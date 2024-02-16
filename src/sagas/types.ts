import { SagaIterator } from "@redux-saga/types";
import { PayloadAction } from "@reduxjs/toolkit";

export type Saga<Payload = null|string> = Payload extends object
  ? ({ payload }: PayloadAction<Payload>) => SagaIterator
  : () => SagaIterator;

export type ErrorMessage = {
  message: string;
};