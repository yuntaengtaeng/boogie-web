import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { GRAY } from '../../../constants/color';

import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import Dropdown from '../../Ui/Dropdown';
import SelectYear from '../../Ui/SelectYear';

import useGetCategory from '../../../hooks/useGetCategory';
import { arrayToDropdownData } from '../../../Utills/common';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 0;
`;

const StyleSelectYear = styled(SelectYear)`
  width: 15.5rem;
  height: 2rem;
  margin: 1rem 0;
  padding: 0;
  padding-left: 0.75rem;
  border: 0.063rem solid ${GRAY};
`;

const GroupInfoInput = ({
  onGroupInfoHandler,
  stateEmptying,
  data,
  isData,
}) => {
  const [startDate, setStartDate] = useState(
    isData ? data.year : new Date().getFullYear()
  );
  const [name, setGroutName] = useState(isData ? data.groupName : '');
  const [classId, setClassId] = useState(isData ? data.classInfo.id : null);
  const satisfied = name === '' || classId === null || startDate === null;

  const classList = arrayToDropdownData(useGetCategory('class'));

  const onDateChange = (e) => {
    setStartDate(e);
  };

  const onClassNameItemHandler = (e) => {
    setClassId(e);
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onGroupInfoHandler({
      groupName: name,
      year: startDate,
      classId: classId,
    });
  };

  useEffect(() => {
    if (satisfied) {
      stateEmptying('groupInfo');
    }
  }, [name, classId, startDate, satisfied, stateEmptying]);

  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>조 정보 입력</p>
        <Input
          style={{ width: '15.625rem', marginTop: '1rem' }}
          placeholder="조 이름"
          value={name}
          onChange={(e) => {
            setGroutName(e.target.value);
          }}
        />
        <StyleSelectYear
          year={startDate}
          onChange={(event) => onDateChange(event.target.value)}
        />
        <Dropdown
          value={classId || ''}
          options={classList}
          placeholder="반"
          onChange={(e) => {
            onClassNameItemHandler(e.target.value);
          }}
          style={{ width: '15.625rem', paddingLeft: '0.75rem' }}
        />
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '1rme' }}
            disabled={name === '' || classId === null}
          >
            {data ? '수정' : '다음'}
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '1rme 0' }} />
    </>
  );
};

GroupInfoInput.propTypes = {
  onGroupInfoHandler: PropTypes.func,
};

export default GroupInfoInput;
