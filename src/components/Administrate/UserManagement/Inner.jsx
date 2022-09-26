import React from 'react';

import styled from 'styled-components';

import Form from './Form';
import UserTable from './UserTable';

const Wrap = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 0.6;
  margin-right: 1rem;
`;

const Right = styled.div`
  flex: 0.4;
`;

const Inner = () => {
  return (
    <Wrap>
      <Left>
        <UserTable />
      </Left>
      <Right>
        <Form />
      </Right>
    </Wrap>
  );
};

export default Inner;
