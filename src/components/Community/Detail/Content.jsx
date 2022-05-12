import React from 'react';
import styled from 'styled-components';
import { GRAY } from '../../../constants/color';
import { VscComment, VscThumbsup, VscEllipsis } from 'react-icons/vsc';
import { HiOutlineUser } from 'react-icons/hi';

const Container = styled.article`
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid #e1e2e3;
  margin-bottom: 2rem;
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

const Middle = styled.div``;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  word-break: break-all;
  margin-top: 5.5rem;
  margin-bottom: 2rem;
`;

const Detail = styled.p`
  font-size: 1.7rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  text-align: left;
  margin-bottom: 5rem;
`;

const Bottom = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;

  > div > div:first-child {
    width: 3.5rem;
  }

  > div > div,
  > div {
    display: flex;
    align-items: center;
  }
`;

const BottomText = styled.span`
  font-size: 0.75rem;
  margin-left: 0.25rem;
  padding: 0.3em 0 0;
  font-weight: 700;
`;

const Content = ({
  profileImageURL,
  userNickname,
  fromNowWhileAgoPosted,
  title,
  content,
  commentCount,
  likeCount,
  isLiked,
  onLikeClickHandler,
}) => {
  return (
    <Container>
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
      <Middle>
        <Title>{title}</Title>
        <Detail>{content}</Detail>
      </Middle>
      <Bottom>
        <div>
          <div>
            <VscComment size={24}></VscComment>
            <BottomText>{commentCount}</BottomText>
          </div>
          <div>
            <VscThumbsup
              size={24}
              color={isLiked ? 'red' : 'black'}
              onClick={onLikeClickHandler}
            />
            <BottomText>{likeCount}</BottomText>
          </div>
        </div>
        <div>
          <VscEllipsis size={24} />
        </div>
      </Bottom>
    </Container>
  );
};

export default Content;
