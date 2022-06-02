import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../../Ui/ProfileImage';

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
          <ProfileImage src={profileImageURL} size={36}></ProfileImage>
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
