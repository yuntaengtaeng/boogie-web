import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments = [], deleteCommentHandler }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          data={comment}
          key={comment.id}
          deleteCommentHandler={deleteCommentHandler}
        />
      ))}
    </div>
  );
};

export default CommentList;
