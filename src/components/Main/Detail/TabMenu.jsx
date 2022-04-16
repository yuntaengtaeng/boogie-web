import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY } from '../../../constants/color';

const StyledDiv = styled.div`
  margin: 50px;
  padding-bottom: 20px;
  ${({ tab, selectedTab }) => {
    return tab === selectedTab ? `box-shadow : 0 4px ${PRIMARY};` : null;
  }};
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
