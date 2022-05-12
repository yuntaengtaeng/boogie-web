import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments = [] }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment data={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default CommentList;
