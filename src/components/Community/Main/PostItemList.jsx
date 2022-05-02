import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const Wrap = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CommentList = ({ commentList = [] }) => {
  return (
    <Wrap>
      {commentList.map((v) => (
        <PostItem></PostItem>
      ))}
    </Wrap>
  );
};

export default CommentList;
