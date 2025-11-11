export const formatPersons = (movie) => {
  const actors = movie.persons.filter(
    (person) =>
      person.profession === "актеры" && person.name !== null
  );
  const directors = movie.persons.filter(
    (person) =>
      person.profession === "режиссеры" && person.name !== null
  );

  return { actors, directors };
};
