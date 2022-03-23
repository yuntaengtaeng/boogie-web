import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VscChromeClose } from 'react-icons/vsc';
import { GRAY } from '../../constants/color';

const StyledChip = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 16pc;
  height: 30px;
  border: 1px solid ${GRAY};
`;

const StyledContent = styled.span`
  padding: 0px 12px;
`;

const Chip = ({ children, onDeleteHandler }) => {
  return (
    <StyledChip>
      <StyledContent>{children}</StyledContent>
      {onDeleteHandler && (
        <VscChromeClose
          style={{
            paddingRight: '12px',
          }}
          onClick={onDeleteHandler}
        ></VscChromeClose>
      )}
    </StyledChip>
  );
};

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  onDeleteHandler: PropTypes.func,
};

export default Chip;
