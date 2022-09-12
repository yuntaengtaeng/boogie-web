import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VscDash } from 'react-icons/vsc';
import { LIGHT_GRAY } from '../../constants/color';

const StyledLable = styled.label`
  margin-right: 1rem;
`;
const StyledDiv = styled.div`
  display: inline-flex;
`;

const StyledCoverSpan = styled.span`
  background-color: ${LIGHT_GRAY};
  border-radius: 0.25rem;
  cursor: pointer;
`;

const DeleteLavle = ({ children, onDeleteHandler }) => {
  return (
    <StyledDiv>
      <StyledLable>{children}</StyledLable>
      {onDeleteHandler && (
        <StyledCoverSpan>
          <VscDash onClick={onDeleteHandler}></VscDash>
        </StyledCoverSpan>
      )}
    </StyledDiv>
  );
};

DeleteLavle.propTypes = {
  children: PropTypes.node.isRequired,
  onDeleteHandler: PropTypes.func,
};

export default DeleteLavle;
