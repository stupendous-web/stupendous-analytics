export const groupBy = (array, property) => {
  if (!array?.length) return [];

  // Group

  const object = array?.reduce((accumulator, object) => {
    const key = object[property];
    const curGroup = accumulator[key] ?? [];

    return { ...accumulator, [key]: [...curGroup, object] };
  }, {});

  // Turn object back into array

  return Object?.keys(object).map((key) => [key, object[key]]);
};
