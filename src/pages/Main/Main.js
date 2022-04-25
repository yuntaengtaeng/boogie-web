import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import styled from 'styled-components';
import { WHITE, GRAY } from '../../constants/color';

import Button from '../../components/Ui/Button';
import MainHeader from '../../components/Main/Main/MainHeader';
import MainFilter from '../../components/Main/Main/MainFilter';
import MainCardList from '../../components/Main/Main/MainCardList';

const StyledSection = styled.section`
  padding: 6.25rem 9.375rem;
  height: fit-content;
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

const Main = () => {
  const { isAdmin } = useSelector((state) => state.user);
  const [year, setYear] = useState(new Date());
  const [filterOption, setFilterOption] = useState({
    name: '',
    plattform: [],
    technology: [],
    classID: {},
  });

  const onFilterOptionHandler = (data) => {
    setFilterOption(data);
  };

  return (
    <StyledSection>
      <MainHeader></MainHeader>
      <StyledDiv>
        <StyleDatePicker
          selected={year}
          onChange={(date) => setYear(date)}
          showYearPicker
          dateFormat="yyyy"
        />
        <StyledSpan>
          <MainFilter
            isShowingModal
            filterOption={filterOption}
            onFilterOptionHandler={onFilterOptionHandler}
          ></MainFilter>
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
        <MainCardList filterOption={filterOption} year={year}></MainCardList>
      </StyledDiv>
    </StyledSection>
  );
};

export default Main;
