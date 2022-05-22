import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VscChromeClose } from 'react-icons/vsc';
import { GRAY, BLACK, WHITE } from '../../constants/color';

const StyledButton = styled.button`
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

const DeleteOutLineButton = ({
  isActive,
  children,
  onDeleteHandler,
  ...props
}) => {
  return (
    <StyledButton isActive={isActive} {...props}>
      {children}
      <VscChromeClose
        style={{
          marginLeft: '1rem',
        }}
        onClick={onDeleteHandler}
      ></VscChromeClose>
    </StyledButton>
  );
};

DeleteOutLineButton.propTypes = {
  children: PropTypes.node.isRequired,
  onDeleteHandler: PropTypes.func,
  isActive: PropTypes.bool,
};

DeleteOutLineButton.defaultProps = {
  isActive: true,
};

export default DeleteOutLineButton;
