import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY, WHITE } from '../../../constants/color';

const StyledDiv = styled.div`
  font-size: 1.2rem;
  padding-bottom: 1.25rem;
  text-align: center;
  flex: 1;
  ${({ tab, selectedTab }) => {
    return `border-bottom : 1px solid ${tab === selectedTab ? PRIMARY : WHITE}`;
  }};

  @media all and (max-width: 479px) {
    word-break: keep-all;
  }
`;

const TitleTap = ({ index, selectedTab, onSelectedHandler, children }) => {
  return (
    <StyledDiv
      tab={index}
      selectedTab={selectedTab}
      onClick={() => {
        onSelectedHandler(index);
      }}
    >
      {children}
    </StyledDiv>
  );
};

TitleTap.propTypes = {
  index: PropTypes.number,
  selectedTab: PropTypes.number,
  onSelectedHandler: PropTypes.func,
  children: PropTypes.node,
};

export default TitleTap;
