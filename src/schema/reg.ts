import { FormPhrases } from "constans/phrases";
import * as yup from "yup";
const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,12}(\s*)?$/;
export const schemaRegistartion = yup.object().shape({
  name: yup.string().required(FormPhrases.required),
  sername: yup.string().required(FormPhrases.required),
  phone: yup
    .string()
    .required(FormPhrases.required)
    .matches(phoneRegExp, FormPhrases.phoneNotFalid),
  password: yup
    .string()
    .required(FormPhrases.required)
    .min(6, FormPhrases.min6),
  repeatPassword: yup
    .string()
    .required(FormPhrases.required)
    .oneOf([yup.ref("password")], FormPhrases.passwordMismatch),
  email: yup
    .string()
    .email(FormPhrases.emailNotValid)
    .required(FormPhrases.required),
  id: yup.string().required(FormPhrases.required),
});




