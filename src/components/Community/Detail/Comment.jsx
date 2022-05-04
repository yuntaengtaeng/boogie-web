import React from 'react';
import styled from 'styled-components';
import { GRAY } from '../../../constants/color';
import { HiOutlineUser } from 'react-icons/hi';

const Container = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid #ececec;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  box-sizing: border-box;
  margin-bottom: 1.5rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  box-sizing: border-box;
  width: 2.25rem;
  height: 2.25rem;
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

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
`;

const TimeStamp = styled.span`
  font-size: 0.75rem;
  color: #666;
  line-height: 100%;
`;

const Bottom = styled.div`
  margin: 1.125rem 0rem;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
`;

const Comment = ({ data }) => {
  const { userNickname, content, fromNowWhileAgoPosted, profileImageURL } =
    data;

  return (
    <Container>
      <Content>
        <Top>
          <ImgContainer>
            {!!profileImageURL ? (
              <Img src={profileImageURL} alt="프로필 이미지" />
            ) : (
              <DefaultProfile>
                <HiOutlineUser size={36}></HiOutlineUser>
              </DefaultProfile>
            )}
          </ImgContainer>
          <Info>
            <Name>{userNickname}</Name>
            <span>·</span>
            <TimeStamp>{fromNowWhileAgoPosted}</TimeStamp>
          </Info>
        </Top>
        <Bottom>{content}</Bottom>
      </Content>
    </Container>
  );
};

export default Comment;
