import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import styled from 'styled-components';
import { GRAY } from '../../../constants/color';

import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import Dropdown from '../../Ui/Dropdown';

import useGetCategory from '../../../hooks/useGetCategory';
import { arrayToDropdownData } from '../../../Utills/common';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 0;
`;

const StyleDatePicker = styled(DatePicker)`
  width: 14.75rem;
  height: 1.875rem;
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
    isData ? new Date(new Date().setFullYear(data.year)) : new Date()
  );
  const [name, setGroutName] = useState(isData ? data.groupName : '');
  const [classId, setClassId] = useState(isData ? data.classInfo.id : null);
  const satisfied = name === '' || classId === null || startDate === null;

  const currentDate = new Date();
  const maxYear = currentDate.getFullYear() + 1;

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
      year: startDate.getFullYear(),
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
        <StyleDatePicker
          selected={startDate}
          onChange={(e) => onDateChange(e)}
          showYearPicker
          dateFormat="yyyy"
          maxDate={new Date(`01-01-${maxYear}`)}
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
