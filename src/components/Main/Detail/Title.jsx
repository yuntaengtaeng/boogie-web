import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitleP = styled.p`
  font-size: 40px;
  margin-bottom: 50px;
`;

const Title = ({ children }) => {
  return (
    <>
      <StyledTitleP>{children}</StyledTitleP>
    </>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
