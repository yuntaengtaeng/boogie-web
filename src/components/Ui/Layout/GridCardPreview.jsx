import React from 'react';
import styled from 'styled-components';

const GridLayout = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-Fill, minmax(18.75rem, 1fr));
`;

const GridCardPreview = ({ children }) => {
  return <GridLayout>{children}</GridLayout>;
};

export default GridCardPreview;
