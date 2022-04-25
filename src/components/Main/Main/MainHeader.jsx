import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
`;

const StyledDiv = styled.div`
  flex: 1;
`;

const StyledStrong = styled.strong`
  font-size: 3rem;
  font-weight: bold;
  line-height: 4rem;
`;

const StyledP = styled.p`
  margin-top: 1.25rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const MainHeader = () => {
  return (
    <StyledHeader>
      <StyledDiv>
        <StyledStrong>
          졸업 작품과
          <br />
          채용 공고를
          <br />
          찾는 가장 쉬운 방법
        </StyledStrong>
        <StyledP>boogie on &amp; on에서 작품을 구경해보세요.</StyledP>
      </StyledDiv>
      <img
        alt="메인이미지"
        src={process.env.PUBLIC_URL + '/asset/main/main.png'}
      />
    </StyledHeader>
  );
};

export default MainHeader;
