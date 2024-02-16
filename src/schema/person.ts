import { FormPhrases } from "constans/phrases";
import * as yup from "yup";

export const schemaPerson = yup.object().shape({
    id: yup.string().required(FormPhrases.required),
    data: yup.string().required(FormPhrases.required),
  });

