import React from 'react';
import CategoryButton from './CategoryButton';

import styled from 'styled-components';

import useDeviceDetect from '../../../hooks/useDeviceDetect';
import TextButton from '../../Ui/TextButton';

const StyledH2 = styled.h2`
  font-size: 0.9rem;
  margin-bottom: 1.4rem;
`;

const CategoryList = ({ categorys, selectedId, onClick }) => {
  const { isMobile } = useDeviceDetect();

  return (
    <>
      {!isMobile && <StyledH2>카테고리</StyledH2>}
      {categorys.map((category) => (
        <TextButton
          key={category.id}
          onClick={onClick}
          isSelected={selectedId === category.id}
          id={category.id}
        >
          {category.name}
        </TextButton>
      ))}
    </>
  );
};

export default CategoryList;
