import { TypeRepresentative } from "redux/slices/person/slice";
import { TypePerson } from "./emuns";
import { PersonPhases, RepresentativePhases } from "./phrases";

export const metaDataFormPeson: Record<
  keyof typeof TypePerson,
  { title: string; discription: string }
> = {
  developer: {
    title: PersonPhases.developer,
    discription:
      "(фамилия, имя, отчество, адрес места жительства, ОГРНИП, ИНН индивидуального предпринимателя, наименование,ОГРН, ИНН, место нахождения, юридического лица, телефон/факс, наименование, ОГРН, ИНН саморегулируемой организации, членом которой является – для индивидуальных предпринимателей и юридических лиц; фамилия, имя, отчество)",
  },
  personcCrryingConstruction: {
    title: PersonPhases.personcCrryingConstruction,
    discription:
      "(фамилия, имя, отчество, адрес места жительства, ОГРНИП, ИНН индивидуального предпринимателя, наименование,ОГРН, ИНН, место нахождения, юридического лица, телефон/факс, наименование, ОГРН, ИНН саморегулируемой организации, членом которой является – для индивидуальных предпринимателей и юридических лиц; фамилия, имя, отчество)",
  },
  personPreparingProjectDocumentation: {
    title: PersonPhases.personPreparingProjectDocumentation,
    discription:
      "(фамилия, имя, отчество, адрес места жительства, ОГРНИП, ИНН индивидуального предпринимателя, наименование,ОГРН, ИНН, место нахождения, юридического лица, телефон/факс, наименование, ОГРН, ИНН саморегулируемой организации, членом которой является – для индивидуальных предпринимателей и юридических лиц; фамилия, имя, отчество)",
  },
  operatingOrganization: {
    title: PersonPhases.operatingOrganization,
    discription:
      "(фамилия, имя, отчество, адрес места жительства, ОГРНИП, ИНН индивидуального предпринимателя, наименование,ОГРН, ИНН, место нахождения, юридического лица, телефон/факс, наименование, ОГРН, ИНН саморегулируемой организации, членом которой является – для индивидуальных предпринимателей и юридических лиц; фамилия, имя, отчество)",
  },
  personPerformedSubjectInspection: {
    title: PersonPhases.personPerformedSubjectInspection,
    discription:
      "(фамилия, имя, отчество, адрес места жительства, ОГРНИП, ИНН индивидуального предпринимателя, наименование,ОГРН, ИНН, место нахождения, юридического лица, телефон/факс, наименование, ОГРН, ИНН саморегулируемой организации, членом которой является – для индивидуальных предпринимателей и юридических лиц; фамилия, имя, отчество)",
  },
  otherPersonsParticipatingExamination: {
    title: PersonPhases.otherPersonsParticipatingExamination,
    discription:
      "(должность с указанием наименования организации, фамилия, инициалы, реквизиты распорядительного документа, подтверждающего полномочия)",
  },
};

export const metaDataFormRepresentative: Record<
  TypeRepresentative,
  { title: string; discription: string }
> = {
  representative: {
    title: RepresentativePhases.representative,
    discription:
      "(должность с указанием наименования организации, фамилия, инициалы, реквизиты распорядительного документа, подтверждающего полномочия)",
  },
  buildControl: {
    title: RepresentativePhases.buildControl,
    discription:
      "(должность с указанием наименования организации, фамилия, инициалы, реквизиты распорядительного документа, подтверждающего полномочия)",
  },
};
