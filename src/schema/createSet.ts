import { FormPhrases } from "constans/phrases";
import * as yup from "yup";

export const schemaCreateSet = yup.object().shape({
    id: yup.string().required(FormPhrases.required),
    name: yup.string().required(FormPhrases.required),
    projectDoc: yup.string(),
    amount: yup.number(),
    objectConstruction: yup.string(),
  });