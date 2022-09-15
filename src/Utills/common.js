export const arrayToDropdownData = (arr) => {
  console.log(arr);
  const clone = [...arr];
  return clone.map(({ id, name }) => ({
    name,
    value: id,
  }));
};
