import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { WHITE } from '../../../constants/color';

import Button from '../../Ui/Button';
import MainHeader from './MainHeader';
import MainFilter from './MainFilter';
import MainCardList from './MainCardList';
import SelectYear from '../../Ui/SelectYear';

import { useMainDispatch } from './MainContext';

const StyledSection = styled.section`
  padding: 6.25rem 9.375rem;
  height: fit-content;
  @media all and (max-width: 479px) {
    width: 80%;
    padding: 0;
    margin: 1rem auto;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  display: inline-flex;
`;

const Inner = () => {
  const { isAdmin } = useSelector((state) => state.user);
  const dispatch = useMainDispatch();

  const onChangeDate = (date) => {
    console.log(date);
    dispatch({ type: 'YEAR_CHANGE', date });
  };

  return (
    <StyledSection>
      <MainHeader></MainHeader>
      <StyledDiv>
        <SelectYear
          onChange={(event) => onChangeDate(event.target.value)}
        ></SelectYear>
        <StyledSpan>
          <MainFilter></MainFilter>
          {isAdmin && (
            <Button style={{ marginLeft: 'auto' }}>
              <Link
                style={{ textDecoration: 'none', color: `${WHITE}` }}
                to="/main/add"
              >
                글쓰기
              </Link>
            </Button>
          )}
        </StyledSpan>
        <MainCardList></MainCardList>
      </StyledDiv>
    </StyledSection>
  );
};

export default Inner;
