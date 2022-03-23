import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCardDiv = styled.div`
  width: fit-content;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 16px;
`;

const Card = ({ children, style }) => {
  return <StyledCardDiv style={style}>{children}</StyledCardDiv>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
