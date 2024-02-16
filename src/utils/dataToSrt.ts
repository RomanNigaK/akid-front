import { Representative } from "redux/slices/person/slice";

export const dataRepresentativetoStr = (data: Representative) => {
  return `${data.postInCompany} ${data.surnameInitials} ${
    data.nrc ? "идентификационный номер специалиста " + data.nrc : ""
  } ${data.order}`;
};
