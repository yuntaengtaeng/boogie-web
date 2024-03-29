import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GRAY, BLACK, WHITE } from '../../constants/color';

const StyledOutLineButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid transparent;
  cursor: pointer;
  height: 2rem;
  padding: 0.25rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.125rem;
  color: ${BLACK};
  outline: none;
  border-color: ${(props) => (props.isActive ? BLACK : GRAY)};
  background-color: ${(props) => (props.isActive ? WHITE : GRAY)};
`;

const OutLineButton = ({ isActive, children, ...props }) => {
  return (
    <StyledOutLineButton isActive={isActive} {...props}>
      {children}
    </StyledOutLineButton>
  );
};

OutLineButton.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
};

OutLineButton.defaultProps = {
  isActive: true,
};

export default OutLineButton;
