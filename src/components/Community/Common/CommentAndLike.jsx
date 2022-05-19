import React from 'react';
import styled from 'styled-components';

import { VscComment, VscThumbsup } from 'react-icons/vsc';

const Wrap = styled.div`
  display: flex;
  align-items: center;

  > div:first-child {
    width: 3.5rem;
  }

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

const CommentAndLike = ({
  commentCount,
  onLikeClickHandler,
  isLiked,
  likeCount,
}) => {
  return (
    <Wrap>
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
    </Wrap>
  );
};

export default CommentAndLike;
