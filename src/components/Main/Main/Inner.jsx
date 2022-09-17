import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import styled from 'styled-components';
import { WHITE, GRAY } from '../../../constants/color';

import Button from '../../Ui/Button';
import MainHeader from './MainHeader';
import MainFilter from './MainFilter';
import MainCardList from './MainCardList';

import { useMainState, useMainDispatch } from './MainContext';

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

const StyleDatePicker = styled(DatePicker)`
  width: 4rem;
  height: 1.875rem;
  margin: 1.25rem 0;
  padding: 0;
  padding-left: 0.75rem;
  border: 1px solid ${GRAY};
`;

const StyledSpan = styled.span`
  display: inline-flex;
`;

const Inner = () => {
  const { isAdmin } = useSelector((state) => state.user);
  const { options } = useMainState();
  const dispatch = useMainDispatch();

  const currentDate = new Date();
  const maxYear = currentDate.getFullYear() + 1;

  const onChangeDate = (date) => {
    dispatch({ type: 'YEAR_CHANGE', date });
  };

  return (
    <StyledSection>
      <MainHeader></MainHeader>
      <StyledDiv>
        <StyleDatePicker
          selected={options.year}
          onChange={(date) => onChangeDate(date)}
          showYearPicker
          dateFormat="yyyy"
          maxDate={new Date(`01-01-${maxYear}`)}
        />
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
