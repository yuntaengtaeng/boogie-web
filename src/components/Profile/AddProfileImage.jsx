import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { HiOutlineUser } from 'react-icons/hi';
import { BLACK, GRAY } from '../../constants/color';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageArea = styled.div`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  background-color: ${GRAY};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const StyledImg = styled.img`
  height: 10rem;
  width: 10rem;
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
  const [previewImage, setPreviewImage] = useState(image !== '' ? image : '');

  const onchange = (e) => {
    setUserImage(e);

    const reader = new FileReader();
    reader.readAsDataURL(e);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImage(reader.result);
        resolve();
      };
    });
  };

  useEffect(() => {
    onAddImageHandler(userImage);
  }, [userImage]);

  return (
    <StyledDiv>
      <ImageArea>
        {previewImage ? (
          <StyledImg src={previewImage} />
        ) : (
          <HiOutlineUser size="5rem" />
        )}
      </ImageArea>

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
