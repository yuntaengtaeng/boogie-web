import React from 'react';
import styled from 'styled-components';
import { GRAY } from '../../constants/color';

import LoginForm from '../../components/Login/LoginForm';

const Container = styled.div`
  width: 80%;
  margin: auto;
`;

const Introduce = styled.div`
  margin-top: 2rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.4rem;
  color: ${GRAY};
`;

const Login = () => {
  return (
    <Container>
      <Introduce>
        <Title>
          서일대를 위한
          <br />
          커리어 플랫폼, boogie on &#38; on!
        </Title>
        <SubTitle>
          커리어 성장과 행복을 위한 여정
          <br />
          지금 boogie on &#38; on에서 시작하세요.
        </SubTitle>
      </Introduce>
      <LoginForm />
    </Container>
  );
};

export default Login;
