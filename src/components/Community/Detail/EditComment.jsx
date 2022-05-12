import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { GRAY } from '../../../constants/color';
import Button, { BUTTON_THEME } from '../../Ui/Button';

const Textarea = styled.textarea`
  border: 1px solid ${GRAY};
  resize: none;
  height: 20vh;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  margin-bottom: 1rem;
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: right;
`;

const EditComment = ({ onSubmitHandler, text, setText }) => {
  const onChange = useCallback(
    (event) => {
      setText(event.target.value);
    },
    [setText]
  );

  const isValid = !!text;

  return (
    <form onSubmit={onSubmitHandler}>
      <Textarea onChange={onChange} value={text}></Textarea>
      <WrapButton>
        <Button type="submit" disabled={!isValid} theme={BUTTON_THEME.PRIMARY}>
          등록
        </Button>
      </WrapButton>
    </form>
  );
};

export default EditComment;
