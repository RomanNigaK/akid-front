import { RootState } from "redux/store";
import { Person, TPerson, TypeRepresentative, OtherPerson } from "./slice";

export const getRootPerson = (state: RootState) => state.person;

export const getPersons = (state: RootState) => getRootPerson(state).persons;

export const getCurrentPersonStatus = (
  state: RootState,
  type: TPerson,
  id?: string
) => {
  const persons = getPersons(state);
  if (persons)
    if (persons[type]) {
      const d = persons[type];
      if (d && "id" in d) {
        const person = d as Person;
        return person?.fetchStatus;
      } else {
        const otherPerson = d as OtherPerson[];
        otherPerson.filter((i) => i.id === id);
        return otherPerson[0].fetchStatus || undefined;
      }
    }

  return undefined;
};

export const getcurrentPersonRepresentativeStatus = (
  state: RootState,
  type: TPerson,
  representative: TypeRepresentative
) => {
  const persons = getPersons(state);
  if (persons)
    if (persons[type]) {
      const d = persons[type];
      if (d && "id" in d) {
        const person = d as Person;
        return person?.[representative]?.fetchStatus;
      }
    }

  return undefined;
};

export const getLastAddOtherPerson = (state: RootState) => {
  const persons = getPersons(state);
  if (persons)
    if (persons.otherPersonsParticipatingExamination) {
      const otherPerson = persons.otherPersonsParticipatingExamination as OtherPerson[];
      return otherPerson[otherPerson.length - 1];
    }

  return undefined;
};
