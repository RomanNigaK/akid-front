export const enum FormPhrases {
  required = "обязательно для заполнения",
  phoneNotFalid = "номер телефона не корректен",
  min6 = "минимальное количество символов 6",
  passwordMismatch = "пароли не совпадают",
  emailNotValid = "email не корректен",
}

export enum PersonPhases {
  developer = "Застройщик(заказчик)",
  personcCrryingConstruction = "Лицо, осуществляющее строительство",
  personPreparingProjectDocumentation = "Лицо, осуществляющее подготовку проектной документации",
  operatingOrganization = "Эксплуатирующая организация",
  personPerformedSubjectInspection = "Лицо, выполнившее работы, подлежащие освидетельстованию",
  otherPersonsParticipatingExamination = "Иные лица учавствующие в освидетельствовании",
}

export const enum ConfirmPhases {
  deleteCompanyFromBasicData = "Удалить компанию из списка общих настроек?",
  deleteRepresentative = "Удалить представителя компании?",
  deleteOtherPerson = "Удалить иное лицо учавствующие в освидетельстовании?",

}

export enum RepresentativePhases {
  representative = "Представитель",
  buildControl = "Строительный контроль",
}
