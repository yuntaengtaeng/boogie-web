import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const Wrap = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const EmptyPostItem = styled.div`
  margin: 2rem 0rem;
  text-align: center;
`;

const CommentList = ({ commentList = [] }) => {
  return (
    <Wrap>
      {commentList.length ? (
        commentList.map((v) => <PostItem key={v.id} commentData={v}></PostItem>)
      ) : (
        <EmptyPostItem>게시글이 없습니다.</EmptyPostItem>
      )}
    </Wrap>
  );
};

export default CommentList;
