import React from 'react';
import CategoryButton from './CategoryButton';

import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-size: 0.9rem;
  margin-bottom: 1.4rem;
`;

const CategoryList = ({ categorys, selectedId, onClick }) => {
  return (
    <>
      <StyledH2>카테고리</StyledH2>
      {categorys.map((category) => (
        <CategoryButton
          key={category.id}
          onClick={onClick}
          isSelected={selectedId === category.id}
          id={category.id}
        >
          {category.name}
        </CategoryButton>
      ))}
    </>
  );
};

export default CategoryList;
