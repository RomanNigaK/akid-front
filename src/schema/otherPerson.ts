import { FormPhrases } from "constans/phrases";
import * as yup from "yup";

export const schemaOtherPerson = yup.object().shape({
    surnameInitials: yup.string().required(FormPhrases.required),
    data: yup.string().required(FormPhrases.required),
  });

