import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ExplanationBox from '../Ui/ExplanationBox';
import Line from '../Ui/Line';

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  width: 99%;
  height: 20rem;
  box-sizing: 0;
  margin: 1rem 0;
  float: center;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const ProfileIntroduction = ({ introduction, onIntroductionHandler, isMe }) => {
  const [text, setText] = useState(introduction || '');
  const EXPLANATION = [
    '본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히작성해주세요.',
    '3~5줄로 요약하여 작성하는 것을 추천합니다!',
  ];

  useEffect(() => {
    onIntroductionHandler(text);
  }, [text]);
  return (
    <StyledDiv>
      <StyledTitle>간단 소개글</StyledTitle>
      {isMe && <ExplanationBox arr={EXPLANATION} />}
      <StyledTextarea
        readOnly={!isMe}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></StyledTextarea>
      <Line styled={{ margin: '1rem 0' }} />
    </StyledDiv>
  );
};

export default ProfileIntroduction;
