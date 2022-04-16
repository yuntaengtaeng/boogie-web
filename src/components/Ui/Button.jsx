import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PRIMARY, SECONDARY, WHITE } from '../../constants/color';

export const BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid transparent;
  cursor: pointer;
  touch-action: manipulation;
  height: 2rem;
  padding: 0.25rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.125rem;
  color: ${WHITE};
  border-color: ${(props) => (props.theme === 'primary' ? PRIMARY : SECONDARY)};
  background-color: ${(props) =>
    props.theme === 'primary' ? PRIMARY : SECONDARY};
  :disabled {
    opacity: 0.4;
  }
  :active {
    opacity: 0.9;
  }
`;

const Button = ({ children, type, theme, ...props }) => {
  return (
    <StyledButton type={type} theme={theme} {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  theme: PropTypes.oneOf(Object.values(BUTTON_THEME)),
};

Button.defaultProps = {
  theme: BUTTON_THEME.PRIMARY,
};

export default Button;
