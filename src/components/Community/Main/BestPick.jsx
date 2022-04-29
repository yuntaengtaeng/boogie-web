import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.25rem;
`;

const BestPickList = styled.div`
  display: flex;
`;

const BestPickItem = styled.div`
  border-radius: 0.625rem;
  padding: 1rem 1.25rem;
  margin-right: 1.25rem;
  flex: 1;

  ${({ index }) => {
    switch (index) {
      case 0:
        return `background-color: #eff1fb`;
      case 1:
        return `background-color : #e4f4ec`;
      case 2:
        return `background-color : #f7f2f9`;
      default:
        return '';
    }
  }}
`;

const BestPickItemTop = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: #939393;
`;

const BestPickItemTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 1.25rem;
`;

const BestPickItemBottom = styled.div`
  display: flex;
`;

const BestPick = ({ title, bestPickData }) => {
  return (
    <div>
      <Title>{title}/boogie on &#38; on PICK</Title>
      <BestPickList>
        {bestPickData.map((data, index) => (
          <BestPickItem key={data.id} index={index}>
            <BestPickItemTop>추천</BestPickItemTop>
            <BestPickItemTitle>{data.title}</BestPickItemTitle>
            <BestPickItemBottom>{data.userNickname}</BestPickItemBottom>
          </BestPickItem>
        ))}
      </BestPickList>
    </div>
  );
};

export default BestPick;
