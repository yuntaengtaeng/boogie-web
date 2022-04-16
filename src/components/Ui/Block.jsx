import React from 'react';
import styled from 'styled-components';

const StyledBlock = styled.header`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Block = ({ children, ...props }) => {
  return <StyledBlock {...props}>{children}</StyledBlock>;
};

export default Block;
