export const arrayToDropdownData = (arr) => {
  const clone = [...arr];
  return clone.map(({ id, name }) => ({
    name,
    value: id,
  }));
};
