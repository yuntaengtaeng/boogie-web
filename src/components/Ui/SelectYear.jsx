import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import useGetCategory from '../../hooks/useGetCategory';
import styled from 'styled-components';
import { GRAY } from '../../constants/color';

const StyledDropdown = styled(Dropdown)`
  width: 6rem;
  height: 1.875rem;
  margin: 1.25rem 0;
  padding: 0;
  padding-left: 0.75rem;
  border: 1px solid ${GRAY};
`;

const SelectYear = ({ ...props }) => {
  const [options, setOptions] = useState([]);

  const getYearList = useGetCategory('year');

  useEffect(() => {
    const changeFormat = (arr) => {
      const item = arr.map((v) => ({
        name: v,
        value: v,
      }));
      return item;
    };

    setOptions(changeFormat(getYearList));
  }, [getYearList]);

  return (
    <div>
      <StyledDropdown
        options={options}
        value={props?.year || new Date().getFullYear()}
        {...props}
      ></StyledDropdown>
    </div>
  );
};

export default SelectYear;
