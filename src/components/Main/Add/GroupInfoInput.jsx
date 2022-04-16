import React, { useState } from 'react';
import styled from 'styled-components';
import { GRAY } from '../../../constants/color';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';
import Line from '../../Ui/Line';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
`;

const StyleDatePicker = styled(DatePicker)`
  width: 236px;
  height: 30px;
  margin-top: 16px;
  padding: 0;
  padding-left: 12px;
  border: 1px solid ${GRAY};
`;

const GroupInfoInput = ({ getInfo, isSubmit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setGroutName] = useState('');

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    getInfo({
      groupName: name,
      year: startDate.getFullYear(),
    });
    isSubmit(2);
  };
  return (
    <>
      <StyledForm onSubmit={onHandlerSubmit}>
        <p>조 정보 입력</p>
        <Input
          style={{ width: '250px', marginTop: '16px' }}
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
        <span>
          <Button
            type="submit"
            style={{ float: 'right', marginTop: '16px' }}
            disabled={name === ''}
          >
            다음
          </Button>
        </span>
      </StyledForm>
      <Line styled={{ margin: '16px 0px' }} />
    </>
  );
};

GroupInfoInput.propTypes = {
  getInfo: PropTypes.func,
  isSubmit: PropTypes.func,
};

export default GroupInfoInput;
