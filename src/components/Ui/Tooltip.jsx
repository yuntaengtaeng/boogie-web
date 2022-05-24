import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LIGHT_GRAY } from '../../constants/color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover > .tooltip {
    display: block;
  }
`;

const StyledTooltip = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
  width: fit-content;
  height: fit-content;
  font-size: 0.625rem;
  background: ${LIGHT_GRAY};
  border-radius: 0.625rem;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 0.375rem 0.375rem rgba(0, 0, 0, 0.23);
`;

const Tooltip = ({ children, message, tooltipStyle, ...props }) => {
  return (
    <Container {...props}>
      {children}
      <StyledTooltip className="tooltip" style={tooltipStyle}>
        {message}
      </StyledTooltip>
    </Container>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
};

export default Tooltip;
