import { Person } from "@/interfaces";

interface Props {
  actors: Person[];
  directors: Person[];
}

export const formatPersons = (persons: Person[]): Props => {
  const actors =
    persons?.filter(
      (person) => person.profession === "актеры" && person.name !== null
    ) || [];
  const directors =
    persons?.filter(
      (person) => person.profession === "режиссеры" && person.name !== null
    ) || [];

  return { actors, directors };
};
