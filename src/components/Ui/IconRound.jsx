import React from 'react';
import styled from 'styled-components';

import { PRIMARY } from '../../constants/color';

const Round = styled.span`
  box-sizing: border-box;
  padding: 0.4rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size + 'rem'};
  height: ${(props) => props.size + 'rem'};
`;

const IconRound = ({ children, onClick, size = 0, color = PRIMARY }) => {
  return (
    <Round onClick={onClick} size={size} color={color}>
      {children}
    </Round>
  );
};

export default IconRound;
