export const arrayToDropdownData = (arr) => {
  const clone = [...arr];
  return clone.map(({ id, name }) => ({
    name,
    value: id,
  }));
};

export const addKeyList = (list, keyName) => {
  return list.map((data) => ({
    ...data,
    key: data[keyName],
  }));
};
