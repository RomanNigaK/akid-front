import { FormPhrases } from "constans/phrases";
import * as yup from "yup";

export const schemaRepresentative = yup.object().shape({
    id: yup.string().required(FormPhrases.required),
    surnameInitials: yup.string().required(FormPhrases.required),
    nrc: yup.string(),
    order: yup.string(),
    postInCompan: yup.string(),
  });