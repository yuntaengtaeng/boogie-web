import React, { useState } from 'react';
import styled from 'styled-components';

import Title from '../../components/Main/Detail/Title';
import TabMenu from '../../components/Main/Detail/TabMenu';
import DetailContents from '../../components/Main/Detail/DetailContents';

const StyledArticle = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 3.125rem 0px;
  height: fit-content;
`;

const StyledSpan = styled.span`
  display: inline-flex;
  font-size: 1.875rem;
  margin-bottom: 3.125rem;
`;

const Detail = () => {
  const tapMenu = ['팀원소개', '프로젝트 설계', '프로젝트 발표 및 시연'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <StyledArticle>
      <Title>title</Title>
      <StyledSpan>
        {tapMenu.map((v, index) => (
          <TabMenu
            key={index}
            index={index}
            selectedTab={selectedIndex}
            onSelectedHandler={setSelectedIndex}
          >
            {v}
          </TabMenu>
        ))}
      </StyledSpan>
      <section>
        <DetailContents selectedIndex={selectedIndex}></DetailContents>
      </section>
    </StyledArticle>
  );
};

export default Detail;
