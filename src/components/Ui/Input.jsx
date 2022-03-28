import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GRAY, WHITE } from '../../constants/color';

const StyledInput = styled.input`
  box-sizing: border-box;
  margin: 0;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  background-color: ${WHITE};
  border: 1px solid ${GRAY};
  border-radius: 2px;
  outline: none;
  height: 32px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${GRAY};
  }

  :-ms-input-placeholder {
    color: ${GRAY};
  }
`;

const Input = forwardRef((props, ref) => {
  return <StyledInput {...props} ref={ref}></StyledInput>;
});

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'number', 'url']),
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  maxLength: PropTypes.number,
};

Input.defaultProps = {
  type: 'text',
  readOnly: false,
};

export default Input;
