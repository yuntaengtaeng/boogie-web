import React from 'react';
import styled from 'styled-components';
import { GRAY } from '../../constants/color';
import { HiOutlineUser } from 'react-icons/hi';

const ImgContainer = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.size / 16 || '1'}rem;
  height: ${(props) => props.size / 16 || '1'}rem;
  border: 1px solid #ececec;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultProfile = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: ${GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = ({ src, size }) => {
  return (
    <ImgContainer size={size}>
      {!!src ? (
        <Img src={src} alt="프로필 이미지" />
      ) : (
        <DefaultProfile>
          <HiOutlineUser size={size}></HiOutlineUser>
        </DefaultProfile>
      )}
    </ImgContainer>
  );
};

export default ProfileImage;
