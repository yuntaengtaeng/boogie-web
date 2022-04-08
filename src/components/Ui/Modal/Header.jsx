import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VscClose } from 'react-icons/vsc';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.onClose && !props.title ? 'right' : 'space-between'};
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;

const Header = ({ title, onClose }) => {
  return (
    <StyledHeader onClose={onClose} title={title}>
      {title}
      {onClose && <VscClose onClick={onClose} size={24} />}
    </StyledHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Header;
