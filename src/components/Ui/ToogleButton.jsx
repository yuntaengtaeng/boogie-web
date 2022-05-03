import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PRIMARY, GRAY, WHITE } from '../../constants/color';

const ToogleButtonContainer = styled.div`
  height: ${(props) => props.size / 2}rem;
  width: ${(props) => props.size}rem;
  border-radius: ${(props) => props.size}rem;
  padding: 0.125rem;
  background-color: ${(props) => (props.isOn ? PRIMARY : GRAY)};
  cursor: pointer;
`;

const Ball = styled.div`
  height: ${(props) => props.size / 2}rem;
  width: ${(props) => props.size / 2}rem;
  border-radius: 50%;
  background-color: ${WHITE};
  transition: 0.5s;
  transform: ${(props) =>
    props.isOn ? `translateX(${props.size / 2}rem)` : 'null'};
`;

const ToogleButton = ({ onClickHandler, isOn, size }) => {
  const onclick = () => {
    onClickHandler(!isOn);
  };

  return (
    <ToogleButtonContainer onClick={onclick} isOn={isOn} size={size}>
      <Ball isOn={isOn} size={size}></Ball>
    </ToogleButtonContainer>
  );
};

ToogleButton.propTypes = {
  size: PropTypes.number,
  onClickHandler: PropTypes.func,
  isClicked: PropTypes.bool,
};

ToogleButton.defaultProps = {
  size: 2,
};

export default ToogleButton;
