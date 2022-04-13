import React from 'react';
import OutLineButton from '../../Ui/OutLineButton';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Wrap = styled.div`
  text-align: center;
`;

const TitleText = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Sub = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Filter = styled.div`
  display: flex;
  flex-flow: wrap;

  > * {
    margin-right: 1rem;
  }
`;

const Title = ({
  leftButtonOnClickHandler,
  rightButtonOnClickHandler,
  filterOptions = [],
  style,
}) => {
  const { email } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  return (
    <Wrap style={style}>
      <TitleText>회사를 추천합니다.</TitleText>
      <Sub>
        <OutLineButton onClick={leftButtonOnClickHandler}>
          태그 딱 맞는 기업 찾기
        </OutLineButton>
        {isLoggiend && (
          <Button
            theme={BUTTON_THEME.PRIMARY}
            type="button"
            onClick={rightButtonOnClickHandler}
          >
            채용 공고 올리기
          </Button>
        )}
      </Sub>
      <Filter>
        {filterOptions.map(({ value, name }) => (
          <OutLineButton key={value}>{name}</OutLineButton>
        ))}
      </Filter>
    </Wrap>
  );
};

export default Title;
