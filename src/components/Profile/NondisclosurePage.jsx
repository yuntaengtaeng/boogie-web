import React from 'react';
import styled from 'styled-components';
import { HiOutlineLockClosed } from 'react-icons/hi';

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h4`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 200;
`;

const NondisclosurePage = () => {
  return (
    <Wrap>
      <Content>
        <HiOutlineLockClosed size={128} />
        <Title>비공개 계정입니다.</Title>
        <Description>
          프로필 정보를 보려면 프로필을 공개해야 합니다.
        </Description>
      </Content>
    </Wrap>
  );
};

export default NondisclosurePage;
