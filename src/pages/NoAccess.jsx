import React from 'react';
import Button, { BUTTON_THEME } from '../components/Ui/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  padding-top: 10rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const NoAccess = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>접근하실 수 없습니다.</Title>
      <Button
        style={{ margin: 'auto' }}
        theme={BUTTON_THEME.PRIMARY}
        onClick={() => {
          navigate(-2);
        }}
      >
        뒤로가기
      </Button>
    </Container>
  );
};

export default NoAccess;
