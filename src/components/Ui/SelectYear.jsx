import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';

const SelectYear = ({ startingYear, lastYear, defaultYear, ...props }) => {
  const [options, setOptions] = useState([]);
  const index = lastYear - startingYear + 1;

  useEffect(() => {
    for (let i = 0; i < index; i++) {
      const clone = options;
      const item = {
        name: startingYear + i,
        value: startingYear + i,
      };
      clone.push(item);
      setOptions(clone);
    }
  }, [index, options, startingYear]);

  console.log(options);

  return (
    <div>
      <Dropdown options={options} {...props}></Dropdown>
    </div>
  );
};

export default SelectYear;
