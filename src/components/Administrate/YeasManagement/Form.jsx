import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import uiSlce from '../../../slices/ui';
import Input from '../../Ui/Input';
import Button from '../../Ui/Button';

const StyledForm = styled.form`
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 2rem auto;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  text-align: left;
`;

const Form = ({ addYear }) => {
  const yearRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const year = yearRef.current.value;

    if (!year) {
      return;
    }

    addYear(year);
    yearRef.current.value = '';
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledLabel>연도</StyledLabel>
      <Input ref={yearRef} type="text" />
      <StyledButton type="submit">연도 추가</StyledButton>
    </StyledForm>
  );
};

export default Form;
