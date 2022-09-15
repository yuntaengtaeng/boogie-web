import React from 'react';
import styled from 'styled-components';

const Space = styled.div`
  width: 100%;
  height: ${(props) => props.size};
`;

const VerticalSpace = ({ size = 0 }) => {
  return <Space size={size} />;
};

export default VerticalSpace;
