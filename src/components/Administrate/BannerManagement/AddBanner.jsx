import React from 'react';
import styled from 'styled-components';
import { PRIMARY, WHITE } from '../../../constants/color';

const Wrap = styled.div`
  float: right;
`;

const StyledLable = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.063rem solid ${PRIMARY};
  background-color: ${PRIMARY};
  width: fit-content;
  height: 1.375rem;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  font-size: 0.875arem;
  border-radius: 0.125rem;
  color: ${WHITE};
  cursor: pointer;
`;

const AddBanner = ({ addBanner }) => {
  return (
    <Wrap>
      <StyledLable htmlFor="chooseFile">배너 추가</StyledLable>
      <input
        type="file"
        id="chooseFile"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          addBanner(e);
        }}
      />
    </Wrap>
  );
};

export default AddBanner;
