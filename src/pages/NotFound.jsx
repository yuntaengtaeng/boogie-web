import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
`;

const NotFound = () => {
  return (
    <Wrap>
      <Title>404</Title>
      <SubTitle>Not Found</SubTitle>
    </Wrap>
  );
};

export default NotFound;
