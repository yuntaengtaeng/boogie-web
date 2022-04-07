import React from 'react';
import { VscFileMedia } from 'react-icons/vsc';
import styled from 'styled-components';
import { WHITE } from '../../../constants/color';

const Floating = styled.div`
  position: absolute;
  top: 75vh;
  left: 80%;
  background-color: ${WHITE};
  padding: 0.6rem 0.8rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const File = styled.input`
  display: none;
`;

const FloatingButton = ({ count, onChange }) => {
  return (
    <Floating>
      <label>
        <VscFileMedia size={24}></VscFileMedia>
        <File type="file" onChange={onChange} />
      </label>
      <div>{count}/1</div>
    </Floating>
  );
};

export default FloatingButton;
