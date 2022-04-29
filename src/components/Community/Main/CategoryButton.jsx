import React from 'react';
import styled from 'styled-components';
import { PRIMARY } from '../../../constants/color';

const StyledCategoryButton = styled.div`
  height: 2.625rem;
  box-sizing: border-box;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.375rem;
  display: flex;
  align-items: center;

  ${({ isSelected }) =>
    isSelected &&
    `
        border-radius: 5px;
        background-color: #f3f9fe;
        border: 1px solid #e1e2e3;
        color: ${PRIMARY};
    `}
`;

const CategoryButton = ({ onClick, children, isSelected, id }) => {
  return (
    <StyledCategoryButton
      onClick={onClick.bind(this, id)}
      isSelected={isSelected}
    >
      {children}
    </StyledCategoryButton>
  );
};

export default CategoryButton;
