import React, { useCallback } from 'react';
import OutLineButton from '../../Ui/OutLineButton';
import Button, { BUTTON_THEME } from '../../Ui/Button';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DeleteOutLineButton from '../../Ui/DeleteOutLineButton';
import { useNavigate } from 'react-router-dom';
import { useJobDispatch, useJobState } from './Context';

const Wrap = styled.div`
  text-align: center;
`;

const TitleText = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
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

const Title = () => {
  const dispatch = useJobDispatch();
  const { options } = useJobState();

  const filterOptions = { ...options };

  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  const moveAddJobPosting = useCallback(() => {
    navigate('/jobposting/add');
  }, [navigate]);

  const showFilterModal = useCallback(() => {
    dispatch({ type: 'OPEN' });
  }, [dispatch]);

  const onDeleteHandler = ({ key, value }) => {
    dispatch({ type: 'OPTIONS_REMOVE', key, value });
  };

  return (
    <Wrap>
      <TitleText>회사를 추천합니다.</TitleText>
      <Sub>
        <OutLineButton onClick={showFilterModal}>
          태그 딱 맞는 기업 찾기
        </OutLineButton>
        {isLoggiend && (
          <Button
            theme={BUTTON_THEME.PRIMARY}
            type="button"
            onClick={moveAddJobPosting}
          >
            채용 공고 올리기
          </Button>
        )}
      </Sub>
      <Filter>
        {Object.entries(filterOptions).map(([key, array]) => {
          return array.map(({ value, name }) => (
            <DeleteOutLineButton
              key={value}
              onDeleteHandler={onDeleteHandler.bind(this, { key, value })}
            >
              {name}
            </DeleteOutLineButton>
          ));
        })}
      </Filter>
    </Wrap>
  );
};

export default Title;
