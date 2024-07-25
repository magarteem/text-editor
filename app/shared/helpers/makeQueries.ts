export const makeQueries = (params: object): string => {
  return Object.entries(params)
    .filter(([_, val]) => val)
    .reduce(
      (previousValue, currentValue, index) =>
        index > 0
          ? previousValue + currentValue.join("=") + "&"
          : previousValue + currentValue.join("="),
      "?",
    );
};
