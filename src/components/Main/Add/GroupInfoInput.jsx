import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import styled from 'styled-components';
import { GRAY } from '../../../constants/color';

import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';
import Dropdown from '../../Ui/Dropdown';

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

const GroupInfoInput = ({ onGroupInfoHandler, stateEmptying }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setGroutName] = useState('');
  const [classList, setClassList] = useState([]);
  const [classId, setClassId] = useState(null);
  const satisfied = name === '' || classId === null || startDate === null;
  useEffect(() => {
    const renameKeys = (arr) => {
      const rename = arr.map(({ id, name }) => ({
        value: id,
        name,
      }));
      return rename;
    };

    const getList = async () => {
      try {
        const response = await axios.get('api/category/class');

        setClassList([...renameKeys(response.data.classList)]);
      } catch (e) {
        alert(e.message);
      }
    };
    getList();
  }, []);

  const onClassNameItemHandler = (e) => {
    setClassId(e);
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    onGroupInfoHandler({
      groupName: name,
      year: startDate.getFullYear(),
      classID: classId,
    });
  };

  useEffect(() => {
    if (satisfied) {
      stateEmptying('groupInfo');
    }
  }, [name, classId, startDate]);

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
          onChange={(date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
        />
        <Dropdown
          value={classId || ''}
          options={classList}
          placeholder="반"
          onChange={(e) => {
            onClassNameItemHandler(e.target.value);
          }}
          style={{ width: '15.625rem' }}
        />
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '1rme' }}
            disabled={name === '' || classId === null}
          >
            다음
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
