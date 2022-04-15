import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VscChromeClose } from 'react-icons/vsc';
import { GRAY } from '../../constants/color';

const StyledChip = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${GRAY};
  padding: 0.2rem 0.4rem;
`;

const StyledContent = styled.span`
  padding: 0px 1rem;
  font-size: 0.8rem;
`;

const Chip = ({ children, onDeleteHandler, style }) => {
  return (
    <StyledChip style={style}>
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
