import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  transition: 0.25s ease;
  &:hover {
    transform: translateY(-1rem);
  }
`;
const HoverTransform = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default HoverTransform;
