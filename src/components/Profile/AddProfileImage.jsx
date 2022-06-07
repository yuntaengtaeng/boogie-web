import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { BLACK } from '../../constants/color';
import ProfileImage from '../Ui/ProfileImage';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${BLACK};
  width: fit-content;
  height: 1.375rem;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  font-size: 0.875arem;
  border-radius: 0.125rem;
  color: ${BLACK};
  cursor: pointer;
`;

const File = styled.input`
  display: none;
`;

const AddProfileImage = ({ image, onAddImageHandler, isMe }) => {
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(image || '');

  const onchange = (e) => {
    setUserImage(e);

    const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  useEffect(() => {
    onAddImageHandler(userImage);
  }, [onAddImageHandler, userImage]);

  return (
    <StyledDiv>
      <ProfileImage src={previewImage} size="160"></ProfileImage>

      {isMe && (
        <StyledLabel>
          사진 추가
          <File
            type="file"
            id="chooseFile"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              onchange(e.target.files[0]);
            }}
          />
        </StyledLabel>
      )}
    </StyledDiv>
  );
};

export default AddProfileImage;
